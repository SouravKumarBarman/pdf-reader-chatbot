import os

def create_upload_folder(folder_name: str):
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
