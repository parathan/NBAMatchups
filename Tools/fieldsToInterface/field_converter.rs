use std::fs;
use std::io;

fn main() -> io::Result<()> {
    let mut line_vector = Vec::new();

    let binding = fs::read_to_string("./fields.txt").unwrap();
    let file_contents = binding.lines();
    for line in file_contents{
        line_vector.push(line.to_string());
    }
    for line in line_vector {
        println!("{}", line);
    }
    Ok(())
}