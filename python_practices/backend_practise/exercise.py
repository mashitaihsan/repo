name = "John"
age = 25
height = 1.75
is_student = True

print(f"Name: {name}, Age: {age}, Height: {height}, Is Student: {is_student}")

# Exercise: Temperature Converter
# Formula: (C * 9/5) + 32 = F

# 1. Accept user input (input always returns a string, so cast to float)
celsius_input = input("Enter temperature in Celsius: ")
celsius = float(celsius_input)

# 2. Convert Celsius to Fahrenheit
fahrenheit = (celsius * 9 / 5) + 32

# 3. Print the formatted result
print(f"{celsius}°C is equal to {fahrenheit:.2f}°F")