use std::fs;
use std::io;
use std::io::prelude::*;

fn main() -> io::Result<()> {
    let mut line_vector = Vec::new();

    let binding = fs::read_to_string("./stats.txt").unwrap();
    let lines = binding.lines();

    for line in lines {
        line_vector.push(line.to_string());
    }

    let mut result_string: String = "".to_string();

    for line in line_vector {
        let str_vector: Vec<&str> = line.split(":").collect();
        let first: String = str_vector[0].to_string();
        let second: String = str_vector[1].trim_matches(' ').to_string();
        let mut result: String = "['".to_string(); 
        result = result + &first + "','" + &second + "'],\n";
        result_string = result_string + &result;
    }

    let ouput_file = fs::File::create("./resultFile_rust.txt");
    let _ = ouput_file?.write_all(result_string.as_bytes());

    Ok(())
}