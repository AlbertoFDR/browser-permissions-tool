# Browser Permissions Tool

This tool is designed to evaluate browser features and determine whether they are powerful or restricted by policy. To achieve this, I created a simple prototype inspired by the concept of [privacytests.org](https://privacytests.org). This project is open-source, and the code is available for access ([Github code](https://github.com/AlbertoFDR/browser-permissions-tool)). In essence, the tool evaluates each known permission listed in its codebase to determine whether it is powerful and/or controlled by policy. To check if a permission is powerful, the tool leverages the `navigator.permissions.query` function. For testing policy-controlled features, it utilizes the `Permissions-Policy header`.
      
As noted, however, this header is currently not supported in Firefox or WebKit. That said, the lack of support for the header does not imply that these browsers fail to implement inheritance to iframes using the `allow` attribute.

## Permission Testing

Using the list of permission at `./code/permissions.js`, uses chromium to check if the permission is policy-controlled, powerful feature or both. For the cases of Firefox and Webkit only checks for powerful feature because permissions-policy header is still not supported.

- Policy-controlled test (only chromium and chrome): Loads a website with the permissions policy header as response and checks for a warning on the console.
- Powerful feature: Uses the WebAPI `navigator.permissions.query` and checks for a warning or the response.

## W3C Standards

- [W3C Permissions Standard](https://www.w3.org/TR/permissions/)
- [W3C Permissions-Policy Standard](https://www.w3.org/TR/permissions-policy/)

## References 

- [W3C Permissions Policy Features (not very updated)](https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md)
- [W3C Permissions Registry (deprecated)](https://github.com/w3c/permissions-registry/)
- [Feature Policy Playground by triblondon](https://github.com/triblondon/feature-policy-playground/tree/master)
