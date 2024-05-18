#!/bin/bash

# This works for Node.js projects currently
# Put this in the root folder of your project
# Run the command chmod +x get_code_context.sh
# Then run ./get_code_context.sh

# Use the current directory as the project directory
project_dir=$(pwd)
echo "Project Directory: $project_dir"

# Use a fixed name for the output file in the current directory
output_file="${project_dir}/code_context.txt"
echo "Output File: $output_file"

# Check if the output file exists and remove it if it does
if [ -f "$output_file" ]; then
  rm "$output_file"
  echo "Existing output file removed"
fi

# List of directories to look for
directories=("src" "lib" "route" "controller" "models" "middleware" "service" "utils" "config" "tests" "migrations" "validations")
echo "Directories to search: ${directories[@]}"

# List of file types to ignore
ignore_files=("*.ico" "*.png" "*.jpg" "*.jpeg" "*.gif" "*.svg" "*.log" "*.md")
echo "Ignore file patterns: ${ignore_files[@]}"

# Recursive function to read files and append their content
read_files() {
  for entry in "$1"/*
  do
    if [ -d "$entry" ]; then
      # If entry is a directory, call this function recursively
      echo "Entering directory: $entry"
      read_files "$entry"
    elif [ -f "$entry" ]; then
      # Check if the file type should be ignored
      should_ignore=false
      for ignore_pattern in "${ignore_files[@]}"; do
        if [[ "$entry" == $ignore_pattern ]]; then
          should_ignore=true
          echo "Ignoring file: $entry"
          break
        fi
      done

      # If the file type should not be ignored, append its relative path and content to the output file
      if ! $should_ignore; then
        relative_path=${entry#"$project_dir/"}
        echo "// File: $relative_path" >> "$output_file"
        cat "$entry" >> "$output_file"
        echo "" >> "$output_file"
        echo "Processed file: $relative_path"
      fi
    fi
  done
}

# Call the recursive function for each specified directory in the project directory
for dir in "${directories[@]}"; do
  if [ -d "${project_dir}/${dir}" ]; then
    echo "Processing directory: ${project_dir}/${dir}"
    read_files "${project_dir}/${dir}"
  else
    echo "Directory not found: ${project_dir}/${dir}"
  fi
done

# Verify the contents of the output file
if [ -f "$output_file" ]; then
  echo "Output file created successfully:"
  ls -l "$output_file"
  echo "First few lines of the output file:"
  head -n 10 "$output_file"
else
  echo "Output file not created."
fi
