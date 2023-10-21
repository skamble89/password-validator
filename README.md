# How to use?

1. Include the javascript file on your page
  ```
  <script src="password-validator.js"></script>
  ```
  
2. Initialize the passwordValidator
   ```
   passwordValidator({
     el: '#password',
     statusEl: '#status'
   })
   ```

# Supported options

- el (required):  selector of password field,
- statusEl (required): selector of element where validation status will be displayed
- lowercase (optional, default: 1): minimum number of lowercase characters
- uppercase (optional, default: 1): minimum number of uppercase characters
- special (optional, default: 1): minimum number of special characters
- number (optional, default: 1): minimum number of numbers
- minlength (optional, default: 8): minimum length of password
