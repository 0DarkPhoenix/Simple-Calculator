use clipboard::{ClipboardContext, ClipboardProvider};
use lazy_static::lazy_static;
use miller_rabin::is_prime;
use num_bigint::BigInt;
use num_bigint::BigUint;
use once_cell::sync::Lazy;
use std::collections::HashMap;
use std::sync::Mutex;
use std::time::Instant;

use super::utils::format_duration;
use super::utils::scientific_notation;

#[derive(serde::Serialize)]
pub struct SequenceResult {
    result: String,
    duration: String,
}

static LAST_SEQUENCE_RESULT: Lazy<Mutex<BigUint>> = Lazy::new(|| Mutex::new(BigUint::default()));

#[tauri::command]
pub fn copy_to_clipboard() -> Result<(), String> {
    let result = LAST_SEQUENCE_RESULT.lock().unwrap();
    let mut ctx: ClipboardContext = ClipboardProvider::new().map_err(|e| e.to_string())?;
    ctx.set_contents(result.to_string())
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn select_sequence(sequence_type: &str, input_value: f64) -> Result<SequenceResult, String> {
    let result = match sequence_type.to_lowercase().as_str() {
        "fibonacci" => {
            let start_time = Instant::now();
            let calc_result = calculate_fibonacci(input_value);
            match calc_result {
                Ok(sequence_result) => {
                    // Store result in global variable
                    let mut last_result = LAST_SEQUENCE_RESULT.lock().unwrap();
                    *last_result = sequence_result.clone();

                    // Check if we need scientific notation
                    let result_str = if sequence_result > BigUint::from(10u32).pow(35) {
                        scientific_notation(&sequence_result)
                    } else {
                        sequence_result.to_string()
                    };

                    let duration = format_duration(start_time.elapsed().as_secs_f64());

                    Ok(SequenceResult {
                        result: result_str,
                        duration,
                    })
                }
                Err(e) => Err(e),
            }
        }
        "prime" => {
            let (result, duration) = calculate_prime(input_value)?;
            Ok(SequenceResult { result, duration })
        }
        "factorial" => {
            let start_time = Instant::now();
            let calc_result = calculate_factorial(input_value);
            match calc_result {
                Ok(sequence_result) => {
                    // Store result in global variable
                    let mut last_result = LAST_SEQUENCE_RESULT.lock().unwrap();
                    *last_result = sequence_result.clone();

                    // Check if we need scientific notation
                    let result_str = if sequence_result > BigUint::from(10u32).pow(35) {
                        scientific_notation(&sequence_result)
                    } else {
                        sequence_result.to_string()
                    };

                    let duration = format_duration(start_time.elapsed().as_secs_f64());

                    Ok(SequenceResult {
                        result: result_str,
                        duration,
                    })
                }
                Err(e) => Err(e),
            }
        }
        _ => Err(format!("Invalid sequence: {}", sequence_type)),
    };

    result
}

// Modified cache to include sequence type in the key
lazy_static! {
    static ref CACHE: Mutex<HashMap<(String, u64), BigUint>> = Mutex::new(HashMap::new());
}

fn calculate_fibonacci(input_value: f64) -> Result<BigUint, String> {
    let n = input_value as u64;

    if n == 0 {
        return Ok(BigUint::ZERO);
    }

    // Check cache first using sequence type and value
    let cache_key = ("fibonacci".to_string(), n);
    if let Some(cached) = CACHE.lock().unwrap().get(&cache_key) {
        return Ok(cached.clone());
    }

    fn fib_pair(n: u64) -> (BigUint, BigUint) {
        if n == 0 {
            return (BigUint::ZERO, BigUint::from(1u32));
        }

        let (a, b) = fib_pair(n >> 1);
        let two = BigUint::from(2u32);

        // Parallel computation for large numbers
        let (c, d) = rayon::join(|| &a * (&b * &two - &a), || &a * &a + &b * &b);

        let result = if n & 1 == 0 {
            (c, d)
        } else {
            let sum = &c + &d;
            (d, sum)
        };

        // Cache the result with the sequence type
        CACHE
            .lock()
            .unwrap()
            .insert(("fibonacci".to_string(), n), result.0.clone());

        result
    }

    let (result, _) = fib_pair(n);
    Ok(result)
}

fn calculate_prime(input_value: f64) -> Result<(String, String), String> {
    let start_time = Instant::now();
    let num = BigInt::from(input_value as i64);

    fn is_prime_check(n: &BigInt) -> bool {
        // Small primes lookup table for quick checking
        const SMALL_PRIMES: &[i32] = &[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

        // Quick check against small primes
        for &p in SMALL_PRIMES {
            let p_big = BigInt::from(p);
            if n == &p_big {
                return true;
            }
            if n % &p_big == BigInt::ZERO {
                return false;
            }
        }

        // Use Miller-Rabin primality test for better performance on large numbers
        // Number of iterations can be adjusted for accuracy
        is_prime(n, 16)
    }
    fn find_next_prime(n: &BigInt) -> BigInt {
        let mut next = if n % 2 == BigInt::ZERO { n + 1 } else { n + 2 };
        while !is_prime_check(&next) {
            next += 2;
        }
        next
    }

    fn find_prev_prime(n: &BigInt) -> BigInt {
        if n <= &BigInt::from(2) {
            return BigInt::from(2);
        }
        let mut prev = n.clone() - 1;
        if prev <= BigInt::ZERO {
            return BigInt::from(2);
        }
        while !is_prime_check(&prev) && prev > BigInt::from(1) {
            prev -= 1;
        }
        if prev < BigInt::from(2) {
            BigInt::from(2)
        } else {
            prev
        }
    }

    let is_prime_result = is_prime_check(&num);
    let prev_prime = find_prev_prime(&num);
    let next_prime = find_next_prime(&num);

    let result = format!(
        "{} {}\nNearest prime below: {}\nNearest prime above: {}",
        num,
        if is_prime_result {
            "is prime"
        } else {
            "is not prime"
        },
        prev_prime,
        next_prime
    );

    let duration = format_duration(start_time.elapsed().as_secs_f64());
    Ok((result, duration))
}

fn calculate_factorial(input_value: f64) -> Result<BigUint, String> {
    let n = input_value as u64;

    if n == 0 || n == 1 {
        return Ok(BigUint::from(1u32));
    }

    // Check cache first using sequence type and value
    let cache_key = ("factorial".to_string(), n);
    if let Some(cached) = CACHE.lock().unwrap().get(&cache_key) {
        return Ok(cached.clone());
    }

    // Calculate factorial using binary splitting for better performance
    fn product(start: u64, end: u64) -> BigUint {
        if start > end {
            return BigUint::from(1u32);
        }
        if start == end {
            return BigUint::from(start);
        }
        if end - start == 1 {
            return BigUint::from(start) * BigUint::from(end);
        }

        let mid = (start + end) / 2;
        let (left, right) = rayon::join(|| product(start, mid), || product(mid + 1, end));

        left * right
    }

    let result = product(2, n);

    // Cache the result with the sequence type
    CACHE.lock().unwrap().insert(cache_key, result.clone());

    Ok(result)
}
