use regex::Regex;

#[tauri::command]
pub fn calculate(formula: &str) -> Result<String, String> {
    // Translate the LaTeX formula into the formula string that meval understands
    let calc_formula = translate_latex_to_eval_formula(&formula);

    // Create a custom context for adding custom functions
    let mut ctx = meval::Context::new();

    // Define factorial function
    ctx.func("fact", |x| {
        // Ensure input is non-negative integer (or close to integer)
        if x < 0.0 || (x - x.round()).abs() > 1e-10 {
            return std::f64::NAN; // Return NaN for invalid inputs
        }

        let n = x as u64;
        (1..=n).fold(1.0, |acc, val| acc * val as f64)
    });

    // Define custom logarithm function with base parameter
    ctx.func2("log", |value, base| {
        if value <= 0.0 || base <= 0.0 || base == 1.0 {
            return std::f64::NAN; // Return NaN for invalid inputs
        }

        // Use change of base formula: logₐ(b) = ln(b)/ln(a)
        value.ln() / base.ln()
    });

    // Define log10 as a convenience function (common logarithm)
    ctx.func("log10", |x| {
        if x <= 0.0 {
            return std::f64::NAN;
        }
        x.log10()
    });

    // Evaluate the formula with the custom context
    meval::eval_str_with_context(&calc_formula, &ctx)
        .map(|result| result.to_string())
        .map_err(|e| {
            format!(
                "Error evaluating formula '{}': {}",
                &calc_formula,
                e.to_string()
            )
        })
}

fn translate_latex_to_eval_formula(display_formula: &str) -> String {
    let replacements = [
        (r"\\times", "*"),
        (r"\\div", "/"),
        (r"\\bmod", "%"),
        (r"\\pi", "pi"),
        (r"\\sqrt\{([^}]*)\}", r"sqrt($1)"),
        (r"\\ln\(\{([^}]*)\}\)", r"ln($1)"),
        (r"\\log\(\{([^}]*)\}\)", r"log10($1)"),
        (r"\\log_(\d+)\(\{([^}]*)\}\)", r"log($2,$1)"),
        (r"\\sin\(\{([^}]*)\}\)", r"sin($1)"),
        (r"\\cos\(\{([^}]*)\}\)", r"cos($1)"),
        (r"\\tan\(\{([^}]*)\}\)", r"tan($1)"),
        (r"\\arcsin\(\{([^}]*)\}\)", r"asin($1)"),
        (r"\\arccos\(\{([^}]*)\}\)", r"acos($1)"),
        (r"\\arctan\(\{([^}]*)\}\)", r"atan($1)"),
        (r"\\sinh\(\{([^}]*)\}\)", r"sinh($1)"),
        (r"\\cosh\(\{([^}]*)\}\)", r"cosh($1)"),
        (r"\\tanh\(\{([^}]*)\}\)", r"tanh($1)"),
        (r"\\arcsinh\(\{([^}]*)\}\)", r"asinh($1)"),
        (r"\\arccosh\(\{([^}]*)\}\)", r"acosh($1)"),
        (r"\\arctanh\(\{([^}]*)\}\)", r"atanh($1)"),
        (r"\\lfloor\{([^}]*)\}\\rfloor", r"floor($1)"),
        (r"\\lceil\{([^}]*)\}\\rceil", r"ceil($1)"),
        (r"\\lfloor\{x\+0\.5\}\\rfloor", "round(x)"),
        (r"\{([^}]*)\}\!", r"fact($1)"),
        (r"e\^\{([^}]*)\}", r"exp($1)"),
        (r"\|([^|]*)\|", r"abs($1)"),
        (r"\\E", "*10^"),
    ];

    // Apply all replacements
    let mut calc_formula = display_formula.to_string();
    for (pattern, replacement) in replacements.iter() {
        let regex = Regex::new(pattern).unwrap();
        calc_formula = regex.replace_all(&calc_formula, *replacement).to_string();
    }

    // Handle any remaining LaTeX specific characters
    let final_regex = Regex::new(r"\{|\}").unwrap();
    calc_formula = final_regex.replace_all(&calc_formula, "").to_string();

    calc_formula
}
