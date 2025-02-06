<!-- Improved compatibility of back to top link: See: https://github.com/Cinoma/url-shortener-v1/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://url-shortener-v1.deno.dev/">
    <img src="public/screenshot.png" alt="Logo">
  </a>

  <h3 align="center">URL Shortener Project</h3>

  <p align="center">
    A take-home project showcasing my full-stack capabilities 
    <br />
    <a href="https://github.com/Cinoma/url-shortener-v1/tree/e647c4ef3f2b5dfecebc3424081e1dab426090fa/docs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://url-shortener-v1.deno.dev/">View Demo</a>
    &middot;
    <a href="https://github.com/Cinoma/url-shortener-v1/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/Cinoma/url-shortener-v1/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#Implementation">Implementation</a></li>
      </ul>
      <ul>
        <li><a href="#bonus-features">Bonus Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#lessons-learned">Lessons Learned</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

I was recently given the task of building a link shortener application similar to the likes of [rebrandly.com](rebrandly.com), [bitly.com](bitly.com), or [https://tinyurl.com/](https://tinyurl.com/). The Goal was to build a full-stack web application that writes data through a backend service via a form, display the newly shortened link below the form, and create an attractive landing page using a mobile first responsive layout and styling. I was given freedom to choose whatever languages and frameworks I feel comfortable using so I chose to use Vite as a build tool, React and MaterialUI for the frontend, and Deno2 and MongoDB for the backend. I will get to the reasoning more in a little bit though.

My given implementation requirements were:
* To Utilize a Link model on the backend with at least two fields: `url` and `slug`
* To generate a unique (to the database) `slug` for each submitted `url` and save both fields to the backend. The `slug` should be random, unique, and have a minimum of 4 alpha-numerical characters.  
* When submitting the form, allow for a user-specified string to override a generated `slug`
  * The "Custom `slug` must also be unique.
  * Display an error if the `slug` is already taken, or force uniqueness by appending something to the `slug`.
* The UI should allow a user to copy any shortened links to their clipboard by clicking a copy button.  

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- IMPLEMENTATION -->
### Implementation

[![Vite][Vite]][Vite-url] [![React][React.js]][React-url] [![MaterialUI][MaterialUI]][MaterialUI-url] [![Deno][Deno]][Deno-url] [![MongoDB][MongoDB]][MongoDB-url]

I decided to utilize [Vite][Vite-url] as the build tool, [React][React-url] and [MaterialUI][MaterialUI-url] for my frontend, and [Deno][Deno-url] & [MongoDB][MongoDB-url] for the backend.

I chose React and MaterialUI because I had previous experience with React and didn't want to spend too much time on the frontend so I could showcase my backend development skills. However, I picked MongoDB because a a non-relational database like MongoDB because in a production environment it would provide high availability and would be easy to scale to millions of users. I have been hearing a lot of buzz on Deno since the release of Deno2, so this seemed like a really good opportunity to try it out especially because ideally it would reduce the number of packages I would have to pull in externally.

Additionally in order to allow 


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BONUS FEATURES -->
### Bonus Features

- [X] Deployed website optimized for mobile devices
- [X] Supports system dark mode on desktops and mobile devices
- [X] URL Shortener works locally, stores data to the database, and redirects users to the corresponding long URL address.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This guide will assist in setting up your project locally and test the application yourself.
To get a local copy up and running follow these simple steps.

### Prerequisites

You will need the following applications pre-installed on your machine in order to run the app locally
* npm
  ```sh
  npm install npm@latest -g
  ```

* deno (for macOS and linux)
  ```sh
  curl -fsSL https://deno.land/install.sh | sh
  ```
  *Please see official deno [installation instructions](https://docs.deno.com/runtime/getting_started/installation/) if you run into any issues.*

* vs code
  ```
  brew install --cask visual-studio-code
  ```
  *Please see official vs code [installation instructions](https://code.visualstudio.com/download) if you run into any issues.*

### Installation

1. Get access to my MongoDB `.env` file and place it in the root directory or create your own file and populate with the following data. <br>*[Setup a free MongoDB cluster](https://cloud.mongodb.com/v2/618724d15cd75376ef93ff2c#/clusters)*
   ```shell
    MONGODB_URI="<your_URI_here>"
    DB_NAME="<your_db_name_here>"
    ```
2. Clone the repo
   ```sh
   git clone https://github.com/Cinoma/url-shortener-v1.git
   ```
3. Install Deno packages   
   ```sh
   deno install
   ```

4. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

5. (Optional) Install NPM packages - in case deno doesn't install your react packages.
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. First spin up the backend locally

   ```sh
   deno task dev-server
   ```
2. Spin up the frontend locally in another terminal window
   ```sh
   deno task dev
   ``` 

    You should see the following in respectively
   ```sh
   Connected to MongoDB
   Server running on http://localhost:8000
   Listening on http://0.0.0.0:8000/    
   ```
   ```sh
   Task dev vite

   VITE v6.0.11  ready in 721 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  press h + enter to show help
   ```

3. Use a `curl` command with the link that the frontend creates. **Be sure to make sure you're using port** `8000`

  ```sh
  curl --request GET \
  --url http://localhost:8000/example
  ```

4. Click the link and you should be redirected.

5. If you want to deploy your code via deno run the following in the root dir
  ```sh
  deno task build
  cd /dist
  deployctl deploy --project=<your_project_name> --entrypoint=jsr:@std/http/file-server
  ``` 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LESSONS LEARNED -->
## Lessons Learned

- Building via deno was fun but not the  most time effective since it took a while to troubleshoot issues like deno not being detected by my IDE so I was unable to use intellisense for the beginning parts of the project.
- This website is massively overengineered for such a simple project. I really wanted showcase my skills so I don't regret doing it this way but if I could do this again I would utilize a service like Firebase for the backend as there would be less time spent trying to get different technologies to communicate with each other since Firebase could handle the server, db, and deployment. In a similar vain, frameworks like Ruby On Rails and Laravel would've helped me develop this application in half the time.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Deploy backend separately and allow the frontend to talk to the live backend service without hindering local development functionality.
- [ ] Allow for creating user accounts
  - [ ] Add a User model with username and password and tie Users to the links they generate
  - [ ] Build a login page or modal to handle user authentication
  - [ ] Add security restrictions for preventing one user from editing or viewing another user's links.
- [ ] High-level design documents

See the [open issues](https://github.com/Cinoma/url-shortener-v1/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Cinoma/url-shortener-v1/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/Cinoma/url-shortener-v1/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/Cinoma/url-shortener-v1/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/Cinoma/url-shortener-v1/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/chris-inoma
[product-screenshot]: public/screenshot.png
[React.js]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/
[Deno]:https://img.shields.io/badge/Deno-000?logo=deno&logoColor=fff
[Deno-url]:https://deno.com/
[Vite]:https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff
[Vite-url]:https://vite.dev/
[MongoDB]:https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white
[MongoDB-url]:https://www.mongodb.com/
[MaterialUI]:https://img.shields.io/badge/Material--UI-0081CB?style=flat&logo=material-ui&logoColor=white
[MaterialUI-url]:https://mui.com/material-ui/?srsltid=AfmBOopNQHySofmq007SPFgu7E0nal-hZII0QmQOhVhjOKuZA8fJrHgx
