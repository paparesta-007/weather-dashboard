import os

def get_folder_size(path='.'):
    total_size = 0
    # Cammina nella directory e somma le dimensioni di tutti i file
    for dirpath, dirnames, filenames in os.walk(path):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            total_size += os.path.getsize(filepath)
    # Converte la dimensione in MB
    total_size_mb = total_size / (1024 * 1024)
    return total_size_mb

# Ottieni la cartella in cui si trova il main.py
folder_path = os.path.dirname(os.path.realpath(__file__))

# Calcola la dimensione
size_in_mb = get_folder_size(folder_path)

print(f"La dimensione della cartella '{folder_path}' è di {size_in_mb:.2f} MB.")
