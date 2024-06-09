use std::fs;
use std::io;
use std::io::prelude::*;

fn main() -> io::Result<()> {
    // Create vector to store lines
    let mut line_vector = Vec::new();

    // Read lines from file
    let binding = fs::read_to_string("./fields.txt").unwrap();
    let file_contents = binding.lines();

    // store lines into vector
    for line in file_contents{
        line_vector.push(line.to_string());
    }

    // create final result string
    let mut result_string: String = "".to_string();


    for line in line_vector {
        let string: Vec<&str> = line.split(':').collect(); // split each line into a 2 element vector seperated by the colon
        let field: String = string[0].trim_matches('"').to_string(); // remove the quotations from the first element
        let value: String = string[1].trim_matches(' ').trim_matches(',').to_string(); // remove the whitespace and comma from the second element
        let valuetype: String = if value.parse::<f64>().is_ok() { //check if the value is a float number
            "number"
        } else {
            "string"
        }.to_string();

        let result: String = field + ": " + &valuetype + ",\n"; //concatenate the values for the single line reults
        result_string = result_string + &result; // append the single line result to the whole string
    }

    // Write string to output file
    let output_file = fs::File::create("./resultFile_rust.txt");
    output_file?.write_all(result_string.as_bytes())?;
    Ok(())
}