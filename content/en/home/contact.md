+++
widget = "contact_form"
title = "Contact me" 

# Uncomment the following line and widget will NOT be displayed
# hidden = true

# Uncomments the following line for
# standard forms.
#
# Form handler
action = "https://getform.io/f/90c955cf-e7f7-471b-a4cd-3d2016177849"
# Form submit method
# method = "GET" # Default is POST

# For Netlify form
#
netlify = true

# Add a contact via email button if your email
# is configured in the config file of your website.
useEmail = true

# Form inputs
[[inputs]]
label = "Your name"
# Input type
type = "text"
# minimum input length
minlength = "3"
# maxlength = "25"
name = "name"
# pattern matching
# pattern = "[a-zA-Z]"
placeholder = "Name"
# The input is required to submit the form
# required = true

[[inputs]]
label = "Your email"
type = "email"
name = "email"
# pattern = ""
placeholder = "Email"
required = true

# Textarea works same as input but doesn't support pattern matching
[[inputs]]
label = "Your message (minimum 10 characters)"
type = "textarea"
minlength = "10"
name = "message"
placeholder = "Your message..."
required = true

+++

Need help to develop a web page or mobile app ?
Let’s talk about it !
