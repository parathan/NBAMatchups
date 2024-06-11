use std::fs;
use std::io;

fn main() -> io::Result<()> {
    let mut line_vector = Vec::new();

    let binding = fs::read_to_string("./stats.txt").unwrap();
    let lines = binding.lines();

    for line in lines {
        line_vector.push(line.to_string());
    }

    let mut result_string: String = "".to_string();

    for line in line_vector {
        println!("{}", line);
    }

    Ok(())
}