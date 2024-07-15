# The role of this page is to save explanations about codes that are in the project so that project members can add additional explanations about their code and share it with everyone before team meetings


# Validation notes:
explanation of what appens inside the if statement:
this code checks if the input is written in email format:
(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i)

/^             # Asserts the start of a string. This ensures that the match starts at the beginning of the input.
[A-Za-z0-9._%+-]+   # Matches any letter (both uppercase and lowercase), any digit, and the special characters `.`, `_`, `%`, `+`, and `-`.
                    # The + ensures that the preceding character class appears one or more times. This means that the local part of the email address must contain at least one character from the specified character class.
@              # Matches the `@` symbol, which separates the local part of the email from the domain part.
[A-Za-z0-9.-]+ # Matches any letter (both uppercase and lowercase), any digit, and the special characters `.` and `-`.
               # The + ensures that the preceding character class appears one or more times. This means that the domain part of the email address must contain at least one character from the specified character class.
\.             # Matches the `.` character literally. This is required to separate the domain and the top-level domain (TLD).
[A-Za-z]{2,4}  # Matches any letter (both uppercase and lowercase). The {2,4} ensures that the preceding character class appears between 2 and 4 times. This means that the TLD must be between 2 and 4 characters long (e.g., `.com`, `.net`, `.info`).
$              # Asserts the end of a string. This ensures that the match ends at the end of the input.
/i             # Case-insensitive flag. This allows the regex to match both uppercase and lowercase letters without distinction.
