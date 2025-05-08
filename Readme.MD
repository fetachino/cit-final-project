### CSS Implementation
For this project, I opted to use vanilla CSS instead of a preprocessor like SCSS/SASS for several reasons:

1. **Direct Browser Compatibility**: Using vanilla CSS ensured the website would work across all browsers without requiring a build step to compile SCSS into CSS.

2. **CSS Variables for Theming**: I implemented CSS variables (custom properties) within the `:root` selector to maintain Purdue's official color scheme throughout the site. This provides similar functionality to SCSS variables while remaining in native CSS:
   ```css
   :root {
       --purdue-gold: #CEB888;
       --purdue-gold-bright: #DAAA00;
       --purdue-black: #000000;
       --purdue-gray: #9D9795;
       --purdue-white: #FFFFFF;
   }
   ```

3. **Simplified Deployment**: No build process means easier deployment and maintenance for future updates.

4. **Performance**: With a relatively small CSS codebase, the overhead of using a preprocessor wasn't justified.

### Responsive Design Implementation

The responsive design was implemented through several techniques:

1. **Flexbox Layout**: The concentration boxes use flexbox for layout, allowing them to adapt from a 2x2 grid on larger screens to a single column on mobile devices:
   ```css
   .concentration-container {
       display: flex;
       flex-wrap: wrap;
       justify-content: center;
       gap: 20px;
       padding: 20px;
   }
   
   @media (max-width: 768px) {
       .concentration-box {
           width: 100%;
       }
   }
   ```

2. **Media Queries**: Used breakpoints at 768px to modify layouts for mobile devices:
   ```css
   @media (max-width: 768px) {
       .concentration-header {
           flex-direction: column;
           text-align: center;
       }
       
       .concentration-icon {
           margin-right: 0;
           margin-bottom: 10px;
       }
       
       .btn-more {
           display: block;
           width: 100%;
           text-align: center;
       }
   }
   ```

3. **Relative Units**: Used relative units (rem, %, etc.) throughout the stylesheet to maintain proportional sizing across different screen sizes.

4. **Viewport Meta Tag**: Included the viewport meta tag in the HTML to ensure proper scaling on mobile devices:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

5. **Mobile-First Navigation**: Implemented a hamburger menu that transforms into a slide-out menu on mobile devices, providing an optimal user experience regardless of screen size.

### Favicon Rationale

The favicon was created to represent Purdue's CIT department with the following considerations:

1. **Brand Consistency**: Used Purdue's official gold (#CEB888) color to maintain brand identity.

2. **Multiple Formats**: Provided both SVG and ICO formats to ensure compatibility across different browsers:
   ```html
   <link href="boilermakers.png" rel="icon" type="image/svg+xml"/>
   <link href="favicon.ico" rel="alternate icon" type="image/x-icon"/>
   ```

3. **Symbolic Representation**: The favicon design incorporates elements representing computing concepts (code brackets, circuit patterns, etc.) to reflect the technical nature of the CIT program.

4. **Scalability**: The SVG format ensures the favicon remains crisp at any resolution, from browser tabs to bookmarks.

### Bootstrap Features Rationale

This project utilizes Bootstrap for specific components while maintaining custom styling for most elements. The four key Bootstrap features implemented were:

1. **Grid System**: Used Bootstrap's grid system for responsive layouts, particularly in the footer:
   ```html
   <div class="row">
     <div class="col-md-6 mb-3 mb-md-0">
       <!-- Content -->
     </div>
     <div class="col-md-6">
       <!-- Content -->
     </div>
   </div>
   ```

2. **Bootstrap Icons**: Leveraged Bootstrap Icons for consistent, scalable iconography throughout the site, particularly in the concentration headers:
   ```html
   <i class="bi bi-code-slash"></i>
   <i class="bi bi-shield-lock"></i>
   <i class="bi bi-diagram-3"></i>
   <i class="bi bi-database"></i>
   ```

3. **Utility Classes**: Used Bootstrap's utility classes for margin, padding, text alignment, and display to maintain consistent spacing and alignment:
   ```html
   <p class="text-center mb-4">
   <div class="mt-3 border-top pt-3 text-center">
   <div class="d-flex justify-content-center justify-content-md-end gap-4">
   ```

4. **Component Styling**: Applied Bootstrap's styling for buttons, cards, and navigation components while customizing them with Purdue's branding colors:
   ```html
   <button class="btn-quiz" onclick="startQuiz()">
     Start Quiz
   </button>
   ```

These Bootstrap features were chosen because they provide a solid foundation for responsive design while allowing for extensive customization to match Purdue's brand identity. The limited use of Bootstrap (only these four features) helped keep the page load times fast while still benefiting from Bootstrap's well-tested components.