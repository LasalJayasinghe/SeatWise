# SEATWISE

## Overview

SEATWISE is a restaurant table booking system that allows users to reserve tables or event halls at restaurants. This project is built using React, Laravel, and Tailwind CSS. It also incorporates two recommendation systems to enhance the user experience.

## Features

- **Table Booking**: Users can easily browse restaurants, view available tables or event halls, and make reservations.

- **Recommendation Systems**: SEATWISE utilizes two recommendation systems to suggest suitable restaurants and dining options, improving the user experience.

- **Responsive Design**: The user interface is designed to be responsive, ensuring a seamless experience across different devices and screen sizes.

- **React**: The frontend is developed using React, a popular JavaScript library for building user interfaces.

- **Laravel**: The backend is powered by Laravel, a PHP framework known for its elegant syntax and robust features.

- **Tailwind CSS**: The project uses Tailwind CSS to create a visually appealing and responsive UI.

Certainly! Here's an updated section in the README file with more detailed installation instructions, including npm and Laravel commands:

```markdown
## Getting Started

1. **Clone the Repository**:

   ```shell
   git clone https://github.com/LasalJayasinghe/SeatWise.git
   cd seatwise
   ```

2. **Backend Setup**:

   - Navigate to the Laravel directory and follow the Laravel setup instructions.

   - Install Composer dependencies:

     ```shell
     composer install
     ```

   - Create a `.env` file and configure your database settings. You can use the example `.env.example` as a template.

   - Generate an application key:

     ```shell
     php artisan key:generate
     ```

   - Run the database migrations to create the required tables:

     ```shell
     php artisan migrate
     ```

   - Start the Laravel server:

     ```shell
     php artisan serve
     ```

   - Your Laravel backend should now be running at `http://localhost:8000`.

3. **Frontend Setup**:

   - Navigate to the React directory and follow the React setup instructions.

   - Install Node.js dependencies:

     ```shell
     npm install
     ```

   - Start the React development server:

     ```shell
     npm run dev
     ```

   - Your React frontend should be accessible at `http://localhost:3000`.

4. **Access the Application**:

   - Open a web browser and go to `http://localhost:3000` to access the SEATWISE application.

## Usage

- Users can browse restaurants, view available tables or event halls, and make reservations.
- The recommendation systems will provide personalized suggestions to enhance the user experience.

## Contributors

- Lasal Jayasinghe
- AnuththaraSamadhi
- Lahiru Kavishka
- K.P.G.K.JAYATHILAKE
- Madushi Saumya
- Vimukthi Dulnath

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to the developers of React, Laravel, and Tailwind CSS for their incredible tools.
```