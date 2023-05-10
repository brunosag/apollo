<h1 align="center">
    <br>
    <a href="https://apolloboards.tk">
        <img src="https://github.com/brunosag/apollo/assets/97703272/aeb4eb1d-b6fc-4954-930d-d339594e4ffa" alt="Apollo" width="200">
    </a>
    <br>
    Apollo
    <br>
</h1>

<h4 align="center">A Kanban-style list-making application built with <a href="https://www.djangoproject.com/" target="_blank">Django</a> & <a href="https://reactjs.org/" target="_blank">React</a>.</h4>

<p align="center">
    <a href="#about">About</a> •
    <a href="#video-demo">Video Demo</a> •
    <a href="#usage">Usage</a> •
    <a href="#acknowledgments">Acknowlegments</a> •
    <a href="#license">License</a> •
    <a href="#contact">Contact</a>
</p>

![Screenshot](https://user-images.githubusercontent.com/97703272/202171394-729ae401-f8f7-47f6-abae-8001a49d414d.png)

## About

Apollo is a robust Kanban-style list-making application inspired by Trello that utilizes Django and Django REST Framework for its back-end, and React and Material UI for its front-end. The application features an API that enables users to authenticate using JWT and perform CRUD operations on boards, lists, and cards. Thanks to the React front-end, it operates as a single-page application, enabling smooth and seamless user experience without requiring page reloads.

Additionally, the app leverages the powerful react-beautiful-dnd library from Atlassian, which enables users to move cards between lists and reorder them with lovely animations. This feature streamlines task management, making it a hassle-free process, and provides an enhanced user experience.

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

## Usage

| Screenshot | Instructions |
|--|--|
| ![Sign in](https://user-images.githubusercontent.com/97703272/233903094-ec0e567f-fab6-49c9-b25b-22d07fe611bd.png) | To access the app, you have two options: create a new account or sign in with a demo user. If you choose to sign in with a demo user, a brand new account will be generated for one-time use. |
| ![Home](https://user-images.githubusercontent.com/97703272/233903092-03ae7b58-4c15-4c07-92be-2a16fc6db8f1.png) | Once you're signed in, click on "Create new board" to create your first board. |
| ![Create board](https://user-images.githubusercontent.com/97703272/233903091-2224aaf6-02b0-4fd3-809c-3e4be0f7b6e5.png) | Give your board a title between 1-128 characters, and then press "Create" or the ENTER key. |
| ![Board page](https://user-images.githubusercontent.com/97703272/233903089-09438062-fe26-4e89-b481-7bee84c05e01.png) | You'll be taken to the board page. To add a new list, click "Add a list". |
| ![Add list](https://user-images.githubusercontent.com/97703272/233903088-7c64a9aa-9ab0-4144-a8df-0581e062fd40.png) | Enter a title for the list (1-128 characters) and click "Add list" or press ENTER to create it. You can add as many lists as you want. To cancel the operation, click the "X" button or anywhere outside the box. |
| ![Add card](https://user-images.githubusercontent.com/97703272/233903086-b902263e-01a2-4e07-9964-d251ab672c57.png) | To add cards to your lists, follow the same process as you did with lists. |
| ![Move cards](https://user-images.githubusercontent.com/97703272/233903084-49c12d4c-feee-4dd9-afa3-54c831a0918c.png) | If you need to rearrange your cards, simply click and drag them to reorder or move them between lists. |
| ![Rename board](https://user-images.githubusercontent.com/97703272/233903081-bf8231c6-4ffb-49df-9e7a-31e5f4ec679b.png) | To rename a board, list, or card, click on the title, enter the new name, and confirm with ENTER. |
| ![Delete card](https://user-images.githubusercontent.com/97703272/233903080-6eaf78f9-8098-4931-a2e0-0666ea88608b.png) | If you want to delete a card, click on it, and the trash can icon will appear. Click it to delete the card. |
| ![Delete list](https://user-images.githubusercontent.com/97703272/233903078-59d54f8d-0396-4008-b82d-15b5b775296d.png) | To delete a list, click on the three dots button next to its name. A dropdown menu will appear, and you can select "Delete list" from there. |
| ![Confirm delete list](https://user-images.githubusercontent.com/97703272/233903076-403c4cb6-2cde-4901-9fb5-b183fdc63d49.png) | If the list contains cards, you'll be asked to confirm your choice, as all cards will be deleted. |
| ![Board menu](https://user-images.githubusercontent.com/97703272/233904805-aa132959-4866-4e4b-be3c-b9accacca378.png) | You can easily switch between boards through the Boards menu on the navbar. |
| ![Deleted board](https://user-images.githubusercontent.com/97703272/233904524-a4c9d190-ab1e-44d1-91e1-ed81862df047.png) | Similar to lists, you can delete the entire board by clicking the dropdown menu on the top right of the board. This will take you to the home page with a confirmation message that the board has been deleted. |


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

Bruno Samuel - <a href="https://www.linkedin.com/in/brunosag/" target="_new">LinkedIn</a> - <a href="mailto:brunosag@outlook.com.br" target="_new">brunosag@outlook.com.br</a>
