import secrets
import string

# defining required string
letters = string.ascii_letters
digits = string.digits
special_characters = string.punctuation

# combining into alphabet
alphabet = letters + digits + special_characters
password = ''

while True:
    try:
        password_length = int(input("\nA-Password Length: "))
        if(password_length<8):
            print("Please select higher than 8 characters for password length")
        else:
            break
        
    except ValueError:
        print("Please enter valid number")
    
try:
    for i in range(password_length):
        password += ''.join(secrets.choice(alphabet))
    
        if(any(char in special_characters for char in password) and sum(char in digits for char in password)>=2):
            break
    
except:
    print("Error Generating")
             

print(password)
             

