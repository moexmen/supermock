# Congratulations!
We're excited you've chosen to use this technology. You are now using the (soon to be) cleanest, simplest and pain free mockup creator, Supermock! Designed for people with varying levels of coding experience, anyone can now engage in rapid development of website mockups. All elements are created natively using HTML and Bootstrap, meaning that no imports of photoshopped webpages and tedious linking to show others the basic functionalities of a website! 

## User Experience
The user experience has been founded on this simple principle: combining the ease of using the mouse and keyboard for different purposes. We start off with providing a WYSIWYG editor because rapid prototyping begins with seeing your ideas come to life. A simple 'text' input in the console will create a simple textbox, filled with randomly generated lorem ipsum text. But more than just being a HTML parser that takes in typed inputs, Supermock allows you to drag, drop and resize elements.

The core problem Supermock aims to tackle is the unnecessary replication of pages in existing mockup apps. Imagine creating an entire set of mockups, page by page, only to have to change the layout of the header bar. Arghhh! You'd have to make the changes manually on each page, a long, tedious and error prone process. Supermock gets around this issue by using the concept of _inheritance_. Similar to an overlay in graphics software, you can create child pages that contain everything the parent page has. Similar content across pages can be put into a parent page, and if ever anything has to change, it only changes at one place!

## Getting Started 
Just type any of these into the console, nested (by a tab indentation) under a page, and it'll appear on screen. 

- button [click=page('_name_of_page_')]
- box (nesting supported) 
- checkbox [checked=true]
- radiobutton [group=\<number\>]
- image [_URL_to_image_]
- link [click=page('name_of_page')]
- text [font-size=\<option\>]
- textarea
- textfield
- icon [click=page('_name_of_page_')] (all [Glyphicons] (http://getbootstrap.com/components/#glyphicons) supported) 
- datepicker
- dropdown
  - item [selected=true]
- number-list
  - item
- bullet-list
  - item
- modal
  - header [close=page('_name_of_page_')]
  - body (nesting supported)
  - footer (nesting supported)
- tabs 
  - tab (nesting supported)
- table [bordered=true]
  - header [align=\<option\>]
    - column [align=\<option\> width=\<percentage\>]
  - row  [text-align=\<option\>]
    - column [align=\<option\> width=\<percentage\>]
  - footer 
    - column [align=\<option\> width=\<percentage\>]

All elements additionally have position (x and y) and size (w and h) attributes

####Properties
* align
  - center, left, right, justify
* font-size
  - percentage
  - pixels

### Pro Tips

* Clean up code by pressing Command-G (G for grid) when typing in the console. It cleans up the layout by moving elements to the nearest 20px for positioning and nearest 5px for sizing. 
* Auto saving based on changes at regular intervals. It's not an excuse to not bother saving yourself!
* Right click on the page in the sidebar to rename it. It'll help you link across pages easily. 