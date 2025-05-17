#[tauri::command]
pub fn converter(
    category: &str,
    input_value: f64,
    input_unit: &str,
    output_unit: &str,
) -> Result<f64, String> {
    let category = category.to_lowercase();
    let input_unit = input_unit;
    let output_unit = output_unit;

    match category.as_str() {
        "length" => convert_length(input_value, input_unit, output_unit),
        "area" => convert_area(input_value, input_unit, output_unit),
        "volume" => convert_volume(input_value, input_unit, output_unit),
        "speed" => convert_speed(input_value, input_unit, output_unit),
        "weight" => convert_weight(input_value, input_unit, output_unit),
        "time" => convert_time(input_value, input_unit, output_unit),
        "temperature" => convert_temperature(input_value, input_unit, output_unit),
        "energy" => convert_energy(input_value, input_unit, output_unit),
        "power" => convert_power(input_value, input_unit, output_unit),
        "data" => convert_data(input_value, input_unit, output_unit),

        _ => Err(format!(
            "Category '{}' doesn't exist in converter",
            category
        )),
    }
}

struct Unit {
    name: &'static str,
    alias: &'static str,
    conversion_constant: f64,
}

fn calculate_conversion(
    input_value: f64,
    input_type: &str,
    output_type: &str,
    units: &[Unit],
) -> Result<f64, String> {
    let input_unit = units
        .iter()
        .find(|unit| input_type == unit.alias)
        .ok_or_else(|| format!("Invalid input unit: {}", input_type))?;

    let output_unit = units
        .iter()
        .find(|unit| output_type == unit.name || output_type == unit.alias)
        .ok_or_else(|| format!("Invalid output unit: {}", output_type))?;

    let result = input_value * input_unit.conversion_constant / output_unit.conversion_constant;
    Ok(result)
}

fn convert_length(input_value: f64, input_type: &str, output_type: &str) -> Result<f64, String> {
    let units = [
        Unit {
            name: "angstrom",
            alias: "a",
            conversion_constant: 1e-10,
        },
        Unit {
            name: "nanometer",
            alias: "nm",
            conversion_constant: 1e-9,
        },
        Unit {
            name: "micrometer",
            alias: "µm",
            conversion_constant: 1e-6,
        },
        Unit {
            name: "millimeter",
            alias: "mm",
            conversion_constant: 0.001,
        },
        Unit {
            name: "centimeter",
            alias: "cm",
            conversion_constant: 0.01,
        },
        Unit {
            name: "meter",
            alias: "m",
            conversion_constant: 1.0,
        },
        Unit {
            name: "kilometer",
            alias: "km",
            conversion_constant: 1000.0,
        },
        Unit {
            name: "nautical mile",
            alias: "nmi",
            conversion_constant: 1852.0,
        },
        Unit {
            name: "mile",
            alias: "mi",
            conversion_constant: 1609.344,
        },
        Unit {
            name: "yard",
            alias: "yd",
            conversion_constant: 0.9144,
        },
        Unit {
            name: "feet",
            alias: "ft",
            conversion_constant: 0.3048,
        },
        Unit {
            name: "inch",
            alias: "in",
            conversion_constant: 0.0254,
        },
        Unit {
            name: "astronomical unit",
            alias: "au",
            conversion_constant: 1.495978707e11,
        },
        Unit {
            name: "light-year",
            alias: "ly",
            conversion_constant: 9.4607304725808e15,
        },
        Unit {
            name: "parsec",
            alias: "pc",
            conversion_constant: 3.0856775814913673e16,
        },
    ];

    calculate_conversion(input_value, input_type, output_type, &units)
}

fn convert_area(input_value: f64, input_type: &str, output_type: &str) -> Result<f64, String> {
    let units = [
        Unit {
            name: "square millimeter",
            alias: "mm²",
            conversion_constant: 0.000001,
        },
        Unit {
            name: "square centimeter",
            alias: "cm²",
            conversion_constant: 0.0001,
        },
        Unit {
            name: "square meter",
            alias: "m²",
            conversion_constant: 1.0,
        },
        Unit {
            name: "hectare",
            alias: "ha",
            conversion_constant: 10000.0,
        },
        Unit {
            name: "square kilometer",
            alias: "km²",
            conversion_constant: 1000000.0,
        },
        Unit {
            name: "square inch",
            alias: "in²",
            conversion_constant: 0.00064516,
        },
        Unit {
            name: "square foot",
            alias: "ft²",
            conversion_constant: 0.092903,
        },
        Unit {
            name: "square yard",
            alias: "yd²",
            conversion_constant: 0.836127,
        },
        Unit {
            name: "acre",
            alias: "ac",
            conversion_constant: 4046.86,
        },
        Unit {
            name: "square mile",
            alias: "mi²",
            conversion_constant: 2589988.11,
        },
    ];

    calculate_conversion(input_value, input_type, output_type, &units)
}

fn convert_volume(input_value: f64, input_type: &str, output_type: &str) -> Result<f64, String> {
    let units = [
        Unit {
            name: "milliliter",
            alias: "ml",
            conversion_constant: 0.001,
        },
        Unit {
            name: "cubic centimeter",
            alias: "cm³",
            conversion_constant: 0.001,
        },
        Unit {
            name: "liter",
            alias: "l",
            conversion_constant: 1.0,
        },
        Unit {
            name: "cubic meter",
            alias: "m³",
            conversion_constant: 1000.0,
        },
        Unit {
            name: "cubic inch",
            alias: "in³",
            conversion_constant: 0.0163871,
        },
        Unit {
            name: "cubic foot",
            alias: "ft³",
            conversion_constant: 28.3168,
        },
        Unit {
            name: "gallon",
            alias: "gal",
            conversion_constant: 3.78541,
        },
        Unit {
            name: "quart",
            alias: "qt",
            conversion_constant: 0.946353,
        },
        Unit {
            name: "pint",
            alias: "pt",
            conversion_constant: 0.473176,
        },
        Unit {
            name: "fluid ounce",
            alias: "fl oz",
            conversion_constant: 0.0295735,
        },
    ];

    calculate_conversion(input_value, input_type, output_type, &units)
}

fn convert_speed(input_value: f64, input_type: &str, output_type: &str) -> Result<f64, String> {
    let units = [
        Unit {
            name: "meter per second",
            alias: "m/s",
            conversion_constant: 1.0,
        },
        Unit {
            name: "kilometer per hour",
            alias: "km/h",
            conversion_constant: 0.277778,
        },
        Unit {
            name: "mile per hour",
            alias: "mph",
            conversion_constant: 0.44704,
        },
        Unit {
            name: "knot",
            alias: "kn",
            conversion_constant: 0.514444,
        },
        Unit {
            name: "foot per second",
            alias: "ft/s",
            conversion_constant: 0.3048,
        },
        Unit {
            name: "mach",
            alias: "mach",
            conversion_constant: 340.29,
        },
    ];

    calculate_conversion(input_value, input_type, output_type, &units)
}

fn convert_weight(input_value: f64, input_type: &str, output_type: &str) -> Result<f64, String> {
    let units = [
        Unit {
            name: "microgram",
            alias: "µg",
            conversion_constant: 1e-9,
        },
        Unit {
            name: "milligram",
            alias: "mg",
            conversion_constant: 1e-6,
        },
        Unit {
            name: "gram",
            alias: "g",
            conversion_constant: 0.001,
        },
        Unit {
            name: "kilogram",
            alias: "kg",
            conversion_constant: 1.0,
        },
        Unit {
            name: "metric ton",
            alias: "t",
            conversion_constant: 1000.0,
        },
        Unit {
            name: "ounce",
            alias: "oz",
            conversion_constant: 0.0283495,
        },
        Unit {
            name: "pound",
            alias: "lb",
            conversion_constant: 0.453592,
        },
        Unit {
            name: "stone",
            alias: "st",
            conversion_constant: 6.35029,
        },
        Unit {
            name: "short ton",
            alias: "ton",
            conversion_constant: 907.185,
        },
    ];
    calculate_conversion(input_value, input_type, output_type, &units)
}

fn convert_time(input_value: f64, input_type: &str, output_type: &str) -> Result<f64, String> {
    let units = [
        Unit {
            name: "nanosecond",
            alias: "ns",
            conversion_constant: 1e-9,
        },
        Unit {
            name: "microsecond",
            alias: "µs",
            conversion_constant: 1e-6,
        },
        Unit {
            name: "millisecond",
            alias: "ms",
            conversion_constant: 0.001,
        },
        Unit {
            name: "second",
            alias: "s",
            conversion_constant: 1.0,
        },
        Unit {
            name: "minute",
            alias: "min",
            conversion_constant: 60.0,
        },
        Unit {
            name: "hour",
            alias: "h",
            conversion_constant: 3600.0,
        },
        Unit {
            name: "day",
            alias: "d",
            conversion_constant: 86400.0,
        },
        Unit {
            name: "week",
            alias: "wk",
            conversion_constant: 604800.0,
        },
        Unit {
            name: "month",
            alias: "mo",
            conversion_constant: 2629746.0,
        },
        Unit {
            name: "year",
            alias: "yr",
            conversion_constant: 31556952.0,
        },
    ];

    calculate_conversion(input_value, input_type, output_type, &units)
}

fn convert_temperature(
    input_value: f64,
    input_type: &str,
    output_type: &str,
) -> Result<f64, String> {
    match (input_type, output_type) {
        ("celsius", "fahrenheit") => Ok(input_value * 9.0 / 5.0 + 32.0),
        ("celsius", "kelvin") => Ok(input_value + 273.15),
        ("fahrenheit", "celsius") => Ok((input_value - 32.0) * 5.0 / 9.0),
        ("fahrenheit", "kelvin") => Ok((input_value - 32.0) * 5.0 / 9.0 + 273.15),
        ("kelvin", "celsius") => Ok(input_value - 273.15),
        ("kelvin", "fahrenheit") => Ok((input_value - 273.15) * 9.0 / 5.0 + 32.0),
        (input, output) if input == output => Ok(input_value),
        _ => Err(format!(
            "Invalid temperature conversion from {} to {}",
            input_type, output_type
        )),
    }
}

fn convert_energy(input_value: f64, input_type: &str, output_type: &str) -> Result<f64, String> {
    let units = [
        Unit {
            name: "joule",
            alias: "j",
            conversion_constant: 1.0,
        },
        Unit {
            name: "kilojoule",
            alias: "kj",
            conversion_constant: 1000.0,
        },
        Unit {
            name: "calorie",
            alias: "cal",
            conversion_constant: 4.184,
        },
        Unit {
            name: "kilocalorie",
            alias: "kcal",
            conversion_constant: 4184.0,
        },
        Unit {
            name: "watt hour",
            alias: "wh",
            conversion_constant: 3600.0,
        },
        Unit {
            name: "kilowatt hour",
            alias: "kwh",
            conversion_constant: 3600000.0,
        },
        Unit {
            name: "electron volt",
            alias: "ev",
            conversion_constant: 1.602176634e-19,
        },
        Unit {
            name: "british thermal unit",
            alias: "btu",
            conversion_constant: 1055.06,
        },
    ];

    calculate_conversion(input_value, input_type, output_type, &units)
}

fn convert_power(input_value: f64, input_type: &str, output_type: &str) -> Result<f64, String> {
    let units = [
        Unit {
            name: "watt",
            alias: "w",
            conversion_constant: 1.0,
        },
        Unit {
            name: "kilowatt",
            alias: "kw",
            conversion_constant: 1000.0,
        },
        Unit {
            name: "megawatt",
            alias: "mw",
            conversion_constant: 1000000.0,
        },
        Unit {
            name: "horsepower",
            alias: "hp",
            conversion_constant: 745.7,
        },
        Unit {
            name: "british thermal unit per hour",
            alias: "btu/h",
            conversion_constant: 0.29307107,
        },
        Unit {
            name: "calorie per second",
            alias: "cal/s",
            conversion_constant: 4.184,
        },
        Unit {
            name: "foot-pound per minute",
            alias: "ft⋅lb/min",
            conversion_constant: 0.0225969658,
        },
    ];

    calculate_conversion(input_value, input_type, output_type, &units)
}

fn convert_data(input_value: f64, input_type: &str, output_type: &str) -> Result<f64, String> {
    let units = [
        // Bits
        Unit {
            name: "bits",
            alias: "b",
            conversion_constant: 1.0,
        },
        Unit {
            name: "kilobits",
            alias: "kb",
            conversion_constant: 1e3,
        },
        Unit {
            name: "megabits",
            alias: "mb",
            conversion_constant: 1e6,
        },
        Unit {
            name: "gigabits",
            alias: "gb",
            conversion_constant: 1e9,
        },
        Unit {
            name: "terabits",
            alias: "tb",
            conversion_constant: 1e12,
        },
        Unit {
            name: "petabits",
            alias: "pb",
            conversion_constant: 1e15,
        },
        Unit {
            name: "exabits",
            alias: "eb",
            conversion_constant: 1e18,
        },
        Unit {
            name: "zettabits",
            alias: "zb",
            conversion_constant: 1e21,
        },
        Unit {
            name: "yottabits",
            alias: "yb",
            conversion_constant: 1e24,
        },
        // Bytes
        Unit {
            name: "bytes",
            alias: "B",
            conversion_constant: 8.0,
        },
        Unit {
            name: "kilobytes",
            alias: "kB",
            conversion_constant: 8.0e3,
        },
        Unit {
            name: "megabytes",
            alias: "MB",
            conversion_constant: 8.0e6,
        },
        Unit {
            name: "gigabytes",
            alias: "GB",
            conversion_constant: 8.0e9,
        },
        Unit {
            name: "terabytes",
            alias: "TB",
            conversion_constant: 8.0e12,
        },
        Unit {
            name: "petabytes",
            alias: "PB",
            conversion_constant: 8.0e15,
        },
        Unit {
            name: "exabytes",
            alias: "EB",
            conversion_constant: 8.0e18,
        },
        Unit {
            name: "zettabytes",
            alias: "ZB",
            conversion_constant: 8.0e21,
        },
        Unit {
            name: "yottabytes",
            alias: "YB",
            conversion_constant: 8.0e24,
        },
        // Binary units (base-2)
        Unit {
            name: "kibibytes",
            alias: "kib",
            conversion_constant: 8.0 * 1024.0,
        },
        Unit {
            name: "mebibytes",
            alias: "mib",
            conversion_constant: 8.0 * 1024.0_f64.powi(2),
        },
        Unit {
            name: "gibibytes",
            alias: "gib",
            conversion_constant: 8.0 * 1024.0_f64.powi(3),
        },
        Unit {
            name: "tebibytes",
            alias: "tib",
            conversion_constant: 8.0 * 1024.0_f64.powi(4),
        },
        Unit {
            name: "pebibytes",
            alias: "pib",
            conversion_constant: 8.0 * 1024.0_f64.powi(5),
        },
        Unit {
            name: "exbibytes",
            alias: "eib",
            conversion_constant: 8.0 * 1024.0_f64.powi(6),
        },
        Unit {
            name: "zebibytes",
            alias: "zib",
            conversion_constant: 8.0 * 1024.0_f64.powi(7),
        },
        Unit {
            name: "yobibytes",
            alias: "yib",
            conversion_constant: 8.0 * 1024.0_f64.powi(8),
        },
    ];

    calculate_conversion(input_value, input_type, output_type, &units)
}
