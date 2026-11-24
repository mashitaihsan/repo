import cv2
import os

# Get the current working directory
current_directory = os.getcwd()

# Construct the full path to the image
image_path = os.path.join(current_directory, "data", "Astronaut.png")

# Decode in three different modes
image1 = cv2.imread(image_path, cv2.IMREAD_COLOR)
image2 = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
image3 = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

# Check if the images were loaded successfully
if image1 is None:
    print("Error: Image not found or unable to read.")
else:
    print("Image loaded successfully!")

if image2 is None:
    print("Error: Image not found or unable to read.")
else:
    print("Image loaded successfully!")

if image3 is None:
    print("Error: Image not found or unable to read.")
else:
    print("Image loaded successfully!")

# Display all three images in windows
cv2.imshow("Color Image", image1)
cv2.imshow("Grayscale Image", image2)
cv2.imshow("Unchanged Image", image3)
