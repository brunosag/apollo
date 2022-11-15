<h1 align="center">
    <br>
    <a href="https://apolloboards.tk">
        <img src="https://user-images.githubusercontent.com/97703272/199108975-6b3b71b3-b80b-42d1-b5a9-cca9ec503efb.png" alt="Apollo" width="200">
    </a>
    <br>
    Apollo
    <br>
</h1>

<h4 align="center">A Kanban-style list-making application built with <a href="https://www.djangoproject.com/" target="_blank">Django</a> & <a href="https://reactjs.org/" target="_blank">React</a>.</h4>

<p align="center">
    <a href="#about">About</a> •
    <a href="#video-demo">Video Demo</a> •
    <a href="#how-to-run">How to Run</a> •
    <a href="#acknowledgments">Acknowlegments</a> •
    <a href="#license">License</a> •
    <a href="#contact">Contact</a>
</p>

![Screenshot](https://user-images.githubusercontent.com/97703272/202171394-729ae401-f8f7-47f6-abae-8001a49d414d.png)

## About

Apollo is a Kanban-style list-making application built with Django and Django REST Framework on the back-end, as well as React and Material UI on the front-end. Through an API, users are allowed to authenticate using JWT and perform CRUD operations on boards, lists, and cards. The React front-end makes it so these operations can be handled asynchronously and with no page reloads. Additionaly, using Atlassian's react-beautiful-dnd library, cards can be quickly moved between lists and reordered with lovely animations.

### Built With

-   [Django](https://www.djangoproject.com/)
-   [Django REST Framework](https://www.django-rest-framework.org/)
-   [React](https://reactjs.org/)
-   [Material UI](https://mui.com/)
-   [Pytest](https://docs.pytest.org/)
-   [Python](https://www.python.org/)
-   [PostgreSQL](https://www.postgresql.org/)

## Video Demo

https://user-images.githubusercontent.com/97703272/202008158-cf3f0d0b-1691-4b7f-b79f-0c8beffa1c2f.mp4

## How to Run

**You can access the fully hosted website on** <a href="http://apolloboards.tk/" target="_blank">apolloboards.tk</a>.

_OR_

Run the project locally:

1. Clone the repository

    ```
    git clone https://github.com/brunosag/Apollo.git
    ```

2. Install pip dependencies

    ```
    pip install -r requirements.txt
    ```

3. Install npm dependencies

    ```
    npm install
    ```

4. Run the build script

    ```
    npm run build
    ```

5. Run the server

    ```
    python manage.py runserver
    ```

## Acknowledgments

-   [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
-   [Simple JWT](https://github.com/jazzband/djangorestframework-simplejwt)
-   [react-detect-click-outside](https://www.npmjs.com/package/react-detect-click-outside)
-   [DRF Writable Nested](https://github.com/beda-software/drf-writable-nested)
-   [Faker](https://github.com/joke2k/faker)
-   [pytest-pspec](https://github.com/gwthm-in/pytest-pspec)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Bruno Samuel - [LinkedIn](https://www.linkedin.com/in/brunosag/) - brunosag@outlook.com.br
