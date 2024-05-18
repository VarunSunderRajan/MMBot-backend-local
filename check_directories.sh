#!/bin/zsh

# This works for Node.js projects currently
# Put this in the root folder of your project
# Run the command chmod +x check_directories.sh
# Then run ./check_directories.sh

# Use the current directory as the project directory
project_dir=$(pwd)
echo "Project Directory: $project_dir"

# List of directories to look for
directories=("src" "lib" "route" "controller" "models" "middleware" "service" "utils" "config" "tests" "validations" "migrations")
echo "Directories to search: ${directories[@]}"

# Check if directories exist and print a message
for dir in "${directories[@]}"; do
  echo "Checking directory: $dir"
  if [ -d "${project_dir}/${dir}" ]; then
    echo "Found directory: ${project_dir}/${dir}"
  else
    echo "Directory not found: ${project_dir}/${dir}"
  fi
done

echo "Script completed."
