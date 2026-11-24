# Exercise: Interactive To-Do List App

tasks = []

while True:
    print("\n" + "="*30)
    print("      TO-DO LIST MENU")
    print("="*30)
    print("1. Add Task (Tambah Tugasan)")
    print("2. View Tasks (Lihat Senarai)")
    print("3. Remove Task (Padam Tugasan)")
    print("4. Exit (Keluar)")
    
    choice = input("\nChoose an option (1-4): ").strip()
    
    # 1. TAMBAH TUGASAN
    if choice == "1":
        task_name = input("Enter new task: ").strip()
        if task_name:
            tasks.append(task_name)
            print(f"✓ Task '{task_name}' added successfully!")
        else:
            print("❌ Task name cannot be empty.")
            
    # 2. LIHAT SENARAI TUGASAN
    elif choice == "2":
        if not tasks:
            print("\n📋 Your To-Do list is currently empty!")
        else:
            print("\n📋 YOUR TO-DO LIST:")
            for index, task in enumerate(tasks, start=1):
                print(f"  {index}. {task}")
                
    # 3. PADAM TUGASAN (Guna Try-Except untuk elak error)
    elif choice == "3":
        if not tasks:
            print("\n⚠️ No tasks to remove.")
        else:
            print("\n📋 CURRENT TASKS:")
            for index, task in enumerate(tasks, start=1):
                print(f"  {index}. {task}")
                
            try:
                task_num = int(input("\nEnter task number to remove: "))
                removed_task = tasks.pop(task_num - 1)
                print(f"✓ Task '{removed_task}' has been removed!")
            except ValueError:
                print("❌ Invalid input! Please enter a valid number.")
            except IndexError:
                print("❌ Task number does not exist!")
                
    # 4. KELUAR
    elif choice == "4":
        print("\nThank you for using To-Do List! Goodbye 👋")
        break
        
    else:
        print("❌ Invalid choice. Please select 1, 2, 3, or 4.")