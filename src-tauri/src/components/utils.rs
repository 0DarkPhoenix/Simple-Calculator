use num_bigint::BigUint;

pub fn format_duration(duration: f64) -> String {
    if duration < 1e-3 {
        format!("{}μs", (duration * 1e6).round() as u16)
    } else if duration < 1.0 {
        format!("{}ms", (duration * 1e3).round() as u16)
    } else {
        format!("{:.3}s", duration)
    }
}

pub fn scientific_notation(number: &BigUint) -> String {
    let first_digits_count = 5 as usize;
    let extra_digits = first_digits_count * 2;

    if number == &BigUint::ZERO {
        return "0.0e0".to_string();
    }

    let base = BigUint::from(10u64);
    let mut first_digits_power = base.pow(first_digits_count as u32);

    let bits = number.bits() as f64;
    let mut total_digits = (bits * 2f64.log10()) as u64;

    let shift = total_digits.saturating_sub(extra_digits as u64);

    let divisor = if shift > 0 {
        let power_of_5 = BigUint::from(5u32).pow(shift as u32);
        power_of_5 << (shift as u32) // Multiply by 2^shift
    } else {
        BigUint::from(1u32)
    };

    let first_digits: BigUint = number / &divisor;

    // Correct the total digits when the integer part is zero
    let mut integer_part = &first_digits / &first_digits_power;

    while integer_part == BigUint::ZERO {
        total_digits -= 1;
        first_digits_power *= &base;
        integer_part = &first_digits / &first_digits_power;
    }

    let first_digits_str = first_digits.to_string();
    let (integer_string, decimal_string) = first_digits_str[..first_digits_count].split_at(1);

    format!(
        "{}.{}e+{}",
        integer_string,
        decimal_string,
        thousands_separator(total_digits)
    )
}

fn thousands_separator(number: u64) -> String {
    number
        .to_string()
        .as_bytes()
        .rchunks(3)
        .rev()
        .map(std::str::from_utf8)
        .collect::<Result<Vec<&str>, _>>()
        .unwrap()
        .join(",")
}
