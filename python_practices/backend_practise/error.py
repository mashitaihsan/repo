# Bahagian 1
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Error: cannot divide by zero.")
finally:
    print("Closing...\n")

# Bahagian 2
try:
    numerator = 10
    denominator = int(input("Enter a denominator: "))
    result = numerator / denominator
except ZeroDivisionError:
    print("Error: Cannot divide by zero.")
except ValueError:
    print("Error: Please enter a valid whole number.")
else:
    print(f'Success! Result: {result}')
finally:
    print("Closing...")