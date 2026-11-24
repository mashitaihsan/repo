# Exercise: Interactive To-Do List

todo_list = []

while True:
    print("\n--- MENU TO-DO LIST ---")
    print("1. Tambah Tugasan")
    print("2. Lihat Senarai Tugasan")
    print("3. Keluar")
    
    choice = input("Pilih pilihan (1-3): ")
    
    if choice == "1":
        task = input("Masukkan tugasan baru: ")
        todo_list.append(task)
        print(f"✓ '{task}' telah ditambah!")
        
    elif choice == "2":
        if not todo_list:
            print("\nSenarai tugasan anda masih kosong!")
        else:
            print("\n--- SENARAI TUGASAN ANDA ---")
            for index, task in enumerate(todo_list, start=1):
                print(f"{index}. {task}")
                
    elif choice == "3":
        print("Terima kasih! Jumpa lagi.")
        break
        
    else:
        print("Pilihan tidak sah. Sila pilih 1, 2, atau 3.")