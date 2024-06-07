use std::fs;
use std::io;

fn main() -> io::Result<()> {
    let file_contents = fs::read_to_string("./fields.txt")?;
    println!("Content: \n{}", file_contents);
    Ok(())
}