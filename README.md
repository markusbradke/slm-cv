# SLM-CV

Controlled vocabulary for GNSS metadata.

## Installation

1. Clone the repository

    ```
    git clone https://github.com/markusbradke/slm-cv.git
    cd slm-cv
    ```

1. Create `.env` file

    ```
    cp .env.example .env
    ```

1. Install composer dependencies

    ```
    composer install
    ```

1. Start Docker containers

    This assumes Docker is installed.

    ```
    vendor/bin/sail up -d
    ```

1. Migrate and seed the database 

    ```
    vendor/bin/sail artisan migrate:fresh --seed
    ```

1. Install frontend dependencies

    ```
    npm install
    ```

1. Start frontend in development mode

    ```
    npm run dev
    ```

Your application is now available at: [http://slm-cv.test](http://slm-cv.test)
