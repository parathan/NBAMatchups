use std::fs;
use std::io;
use std::io::prelude::*;

fn main() -> io::Result<()> {
    // Create vector to store lines
    let mut line_vector = Vec::new();

    // Read lines from file
    let binding = fs::read_to_string("./stats.txt").unwrap();
    let lines = binding.lines();

    // Store lines into vector
    for line in lines {
        line_vector.push(line.to_string());
    }

    // Create final result string
    let mut result_string: String = "".to_string();

    for line in line_vector {
        let str_vector: Vec<&str> = line.split(":").collect(); // Split each line into a 2 element vector of the string delimited by ':'
        let first: String = str_vector[0].to_string(); // First element in the given vector
        let second: String = str_vector[1].trim_matches(' ').to_string(); // Second element in the given vector with the whitespace in the front removed
        let mut result: String = "['".to_string(); // Initial value for the result line
        result = result + &first + "','" + &second + "'],\n"; // Append first and second to the result
        result_string = result_string + &result; // Append the singe line result to the final result string
    }

    // Write string to output file
    let ouput_file = fs::File::create("./resultFile_rust.txt");
    let _ = ouput_file?.write_all(result_string.as_bytes());

    Ok(())
}