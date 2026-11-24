# LATIHAN SNIPPET

text = "Python Programming"
numbers = [10, 20, 30, 40, 50]

# 1. Gunakan String Slicing untuk ambil perkataan "Python" sahaja dari 'text'
word = text[ : ]

# 2. Gunakan List Slicing untuk ambil 3 nombor pertama dari 'numbers' ([10, 20, 30])
first_three = numbers[ : ]

# 3. Lengkapkan f-string supaya output menjadi: "Modul: Python, Total: 150"
# (Hint: gunakan sum(numbers) untuk dapatkan jumlah 150)
result = f"Modul: {word}, Total: {sum(numbers)}"

print(f"Word: {word}")
print(f"First Three: {first_three}")
print(result)