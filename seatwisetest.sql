-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2023 at 05:56 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seatwisetest`
--

-- --------------------------------------------------------

--
-- Table structure for table `advertisements`
--

CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `photo` varchar(300) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `advertisements`
--

INSERT INTO `advertisements` (`id`, `restaurant_id`, `photo`, `duration`, `price`, `updated_at`, `created_at`) VALUES
(1, 16, 'uploads/views/1698686125.jpg', '1 day', '199', '2023-10-30 11:45:25', '2023-10-30 11:45:25'),
(12, 16, 'uploads/views/1698757652.jpg', '3 months', '2699', '2023-10-31 07:37:32', '2023-10-31 07:37:32');

-- --------------------------------------------------------

--
-- Table structure for table `cashiers`
--

CREATE TABLE `cashiers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `cashier_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cashier_phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cashiers`
--

INSERT INTO `cashiers` (`id`, `restaurant_id`, `cashier_name`, `address`, `email`, `cashier_phone_number`, `password`, `created_at`, `updated_at`, `photo`) VALUES
(16, 16, 'hashi', 'Colombo', 'hashi89@gmail.com', '0762711600', '$2y$10$fRD24NNwAewm6cKI1OxQEeO0rt.rJiMbpgjyV107K2.MioUff6nfe', '2023-10-28 07:35:41', '2023-10-28 07:35:41', 'cashier.jpg'),
(17, 16, 'hirushi', 'Matara', 'hirushi83@gmail.com', '0762711234', '$2y$10$oFTFk9b/RnEiOPrQVn7XIuB8YsC8OGFKhL1MFh7olPcE2ZHwbv8rS', '2023-10-28 09:22:41', '2023-10-30 07:29:34', '1698504761.jpg'),
(18, 16, 'Sanduni', 'Gampaha', 'sanduni23@gmail.com', '0762711605', '$2y$10$g/z/gJYmMjjsMcni.f/wKeebkC4Qu9FVVDfCxirrWIthkI5cU8Apa', '2023-10-28 09:25:01', '2023-10-28 09:25:01', '1698504901.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Desserts', '2023-08-14 05:30:57', '2023-08-14 05:30:57'),
(2, 'Pizza', '2023-08-14 05:32:45', '2023-08-14 05:32:45');

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `complaintID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `restaurantID` bigint(20) UNSIGNED NOT NULL DEFAULT 16,
  `userID` int(11) NOT NULL DEFAULT 2,
  `status` int(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`complaintID`, `title`, `description`, `restaurantID`, `userID`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Meal reservation errors', 'Table for two suggestions are not efficient.', 16, 2, 0, '2023-10-31 06:06:38', '2023-10-31 06:06:38'),
(2, 'Complaint 3', 'I am disappointed with the table booking system. Despite confirming my reservation, my table was not available upon arrival, causing inconvenience. Improve reliability and communication.', 16, 2, 0, '2023-10-31 06:09:27', '2023-10-31 06:09:27'),
(3, 'Unsatisfactory Table Reservation', 'I am disappointed with the table booking system. Despite confirming my reservation, my table was not available upon arrival, causing inconvenience. Improve reliability and communication.', 16, 2, 0, '2023-10-31 06:13:50', '2023-10-31 06:13:50'),
(4, 'complaint 1', 'complaint 1 description', 16, 2, 0, '2023-10-31 06:14:17', '2023-10-31 06:14:17'),
(5, 'complaint 2', 'complaint 2 description', 16, 2, 0, '2023-10-31 06:14:32', '2023-10-31 06:14:32'),
(6, 'Payment Error', 'I have been charged twice for the same thing.', 16, 2, 0, '2023-10-31 07:11:41', '2023-10-31 07:11:41');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `userID` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `hometown` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `photo` varchar(255) NOT NULL,
  `about` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `halls`
--

CREATE TABLE `halls` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pictures` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `halls`
--

INSERT INTO `halls` (`id`, `name`, `description`, `pictures`, `restaurant_id`, `created_at`, `updated_at`) VALUES
(1, 'Birthday banquet', 'A/C\r\nSpeakers available\r\n70-80 Capacity', '', 16, NULL, NULL),
(2, 'Conference Room', 'A/C\nMicrophone stand available\n70-80 Capacity', '', 16, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `halls_slots`
--

CREATE TABLE `halls_slots` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `slot_date` date NOT NULL,
  `hall_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `halls_slots`
--

INSERT INTO `halls_slots` (`id`, `start_time`, `end_time`, `slot_date`, `hall_id`, `created_at`, `updated_at`) VALUES
(3, '10:00:00', '13:00:00', '2023-11-03', 1, NULL, NULL),
(4, '18:00:00', '21:00:00', '2023-11-03', 1, NULL, NULL),
(5, '14:00:00', '15:00:00', '2023-11-03', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hall_reservations`
--

CREATE TABLE `hall_reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `reservant_name` varchar(100) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `contact_number` varchar(12) NOT NULL,
  `Occasion_type` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Slot_id` bigint(20) UNSIGNED DEFAULT 4,
  `hall_id` bigint(20) UNSIGNED DEFAULT 1,
  `slot_date` date NOT NULL DEFAULT '2023-10-31',
  `start_time` time NOT NULL DEFAULT '18:00:00',
  `end_time` time NOT NULL DEFAULT '21:00:00',
  `Transaction_status` tinyint(4) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hall_reservations`
--

INSERT INTO `hall_reservations` (`id`, `user_id`, `reservant_name`, `email_address`, `contact_number`, `Occasion_type`, `Description`, `Slot_id`, `hall_id`, `slot_date`, `start_time`, `end_time`, `Transaction_status`, `created_at`, `updated_at`) VALUES
(2, 1, 'Samadhi', 'samadhi@gmail.com', '0987654321', 'Wedding', 'Speaker needed', 3, 1, '2023-10-31', '10:00:00', '13:00:00', NULL, NULL, NULL),
(3, 1, 'Samadhi', 'vimukthidulnath@gmail.com', '0987654321', 'wedding', 'jhkjhjh', 4, 1, '2023-11-02', '10:00:00', '11:00:00', 0, '2023-10-30 05:26:27', '2023-10-30 05:26:27'),
(12, 1, 'Samadhi', 'samadhi@gmail.com', '0987654321', 'Wedding', 'Speaker needed', 3, 1, '2023-11-03', '10:00:00', '13:00:00', NULL, NULL, NULL),
(13, 1, 'Samadhi', 'vimukthidulnath@gmail.com', '0987654321', 'wedding', 'jhkjhjh', 4, 1, '2023-11-02', '10:00:00', '11:00:00', 0, '2023-10-29 23:56:27', '2023-10-29 23:56:27'),
(16, 1, 'samadhi', 'samadhi@gmail.com', '0987654321', 'wedding', 'need speakers', 4, 1, '2023-11-03', '18:00:00', '21:00:00', 0, '2023-11-01 04:03:20', '2023-11-01 04:03:20'),
(17, 1, 'amandi', 'amandi@gmail.com', '0897654321', 'wedding', 'i need mics', 4, 1, '2023-11-04', '18:00:00', '21:00:00', 0, '2023-11-01 04:10:30', '2023-11-01 04:10:30'),
(18, 1, 'devindi', 'dev@g.c', '08739182371', 'wedding', 'we need food', 4, 1, '2023-11-04', '18:00:00', '21:00:00', 0, '2023-11-01 04:20:19', '2023-11-01 04:20:19'),
(19, 1, 'sam', 'e@h.c', '09283019830', 'wed', 'need food', 4, 1, '2023-10-31', '18:00:00', '21:00:00', 0, '2023-11-01 05:27:49', '2023-11-01 05:27:49'),
(110, 1, 'sam', 'e@h.c', '09283019830', 'wed', 'need food', 4, 1, '2023-10-31', '18:00:00', '21:00:00', 0, '2023-11-01 05:28:53', '2023-11-01 05:28:53');

-- --------------------------------------------------------

--
-- Table structure for table `meals`
--

CREATE TABLE `meals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `potion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(20,0) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `availability` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `meals`
--

INSERT INTO `meals` (`id`, `restaurant_id`, `name`, `category_id`, `potion`, `price`, `description`, `photo`, `availability`, `created_at`, `updated_at`) VALUES
(2, 17, 'Chicken Kotthu', 1, 'S', '1000', 'Kotthu with chicken', 'https://img.freepik.com/free-photo/high-angle-traditional-asian-meal-with-chopsticks_23-2148694371.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph', 0, '2023-08-14 08:53:02', '2023-08-14 08:53:02'),
(3, 16, 'Pan Pizza', 1, 'S', '3200', 'Pan pizza thin crust with gravy', 'https://img.freepik.com/free-photo/crispy-pizza-with-cheese-tomatoes_140725-3096.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais', 1, '2023-08-14 10:07:21', '2023-11-02 04:26:12'),
(4, 16, 'Sausage Delight Pizza', 2, 'S', '450', 'Chicken sausages & onions with a double layer of cheese', 'https://img.freepik.com/free-photo/crispy-pizza-with-cheese-tomatoes-sausage_140725-4611.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais', 0, '2023-08-14 11:15:14', '2023-08-14 11:15:14'),
(5, 16, 'Pepperoni Pizza', 2, 'S', '567', 'Pizza with mozarella , peparoni and two toppings', 'https://img.freepik.com/free-photo/mix-pizza-with-tomato-slices-mushroom-olive_140725-185.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais', 0, '2023-08-15 11:30:52', '2023-08-15 11:30:52'),
(6, 16, 'Cheese Pizza', 2, 'S', '230', 'Rich tomato sauce with a triple layer of mozzarella cheese', 'https://img.freepik.com/free-photo/georgian-cheese-khachapuri-imeruli-georgian-traditional-food-hot-khachapuri_114579-140.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais', 0, '2023-08-15 11:39:13', '2023-08-15 11:39:13'),
(8, 17, 'Apple Pie', 1, 'S', '300', 'Apple pie with caramel coating', 'https://img.freepik.com/free-photo/top-view-delicious-apple-cake-with-fresh-green-apples-cinnamons-cake-biscuit-sugar-fruit_140725-22432.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais', 0, '2023-08-19 09:48:01', '2023-08-19 09:48:01'),
(9, 17, 'Pizza Magarita', 2, 'S', '1200', 'Cheese Margarita with chili chicken', 'https://img.freepik.com/free-photo/mix-pizza-with-tomato-slices-mushroom-olive_140725-185.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais', 0, '2023-08-28 08:35:07', '2023-08-28 08:35:07');

-- --------------------------------------------------------

--
-- Table structure for table `meal_reservations`
--

CREATE TABLE `meal_reservations` (
  `mealReservationID` bigint(20) NOT NULL,
  `mealIDs` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `size` varchar(10) NOT NULL,
  `instructions` text NOT NULL,
  `restaurantID` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_07_14_082241_create_restaurants_table', 1),
(6, '2023_07_23_151002_create_cashiers_table', 2),
(7, '2023_07_24_090252_create_views_table', 3),
(8, '2023_07_23_190321_create_cashiers_table', 4),
(9, '2023_07_25_142750_create_tables_table', 5),
(10, '2023_07_26_165344_create_tables_table', 6),
(11, '2023_07_27_173439_create_profiles_table', 7),
(12, '2023_07_27_181911_create_profiles_table', 8),
(13, '2023_08_04_153813_create_halls_table', 9),
(14, '2023_08_04_153847_create_table_structures', 9),
(15, '2023_08_04_154412_create_time_availabilities_table', 9),
(16, '2023_08_14_050222_create_meals_table', 10),
(17, '2023_08_14_052118_create_meals_table', 11),
(18, '2023_08_14_161151_create_categories_table', 12),
(21, '2023_09_22_084628_make_columns_in_user_nullable', 13),
(22, '2023_09_22_095205_make_columns_in_user_nullable_lastname', 14),
(23, '2023_09_22_095847_make_columns_in_user_nullable_columns', 15),
(27, '2023_09_27_041620_create_tablefortwo', 16);

-- --------------------------------------------------------

--
-- Table structure for table `monthly_payments`
--

CREATE TABLE `monthly_payments` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `card` varchar(255) NOT NULL,
  `cardno` varchar(255) NOT NULL,
  `expiry` int(11) DEFAULT NULL,
  `cvv` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `monthly_payments`
--

INSERT INTO `monthly_payments` (`id`, `restaurant_id`, `amount`, `card`, `cardno`, `expiry`, `cvv`, `updated_at`, `created_at`) VALUES
(1, 16, 2937, 'Visa', '1234123456782345', NULL, 234, '2023-10-31 11:06:49', '2023-10-31 11:06:49'),
(2, 16, 2937, 'Visa', '2345678912345678', NULL, 123, '2023-10-31 11:11:54', '2023-10-31 11:11:54'),
(3, 16, 2937, 'Visa', '123434566789', NULL, 678, '2023-10-31 11:18:59', '2023-10-31 11:18:59');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `meal` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `offer_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `offer_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `offer_percentage` bigint(20) UNSIGNED NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `days_of_week` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `minimum_purchase_amount` bigint(20) UNSIGNED NOT NULL,
  `offer_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`id`, `restaurant_id`, `meal`, `offer_type`, `offer_title`, `offer_percentage`, `start_date`, `end_date`, `days_of_week`, `minimum_purchase_amount`, `offer_description`, `created_at`, `updated_at`) VALUES
(1, 16, 'Chicken Kotthu', 'Discount', 'Don\'t miss your discount for Chicken kottu', 10, '2023-09-17 18:30:00', '2023-09-28 18:30:00', 'Saturday', 900, 'ljhor oregoeru', '2023-09-16 08:00:54', '2023-10-31 00:41:08');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(11, 'App\\Models\\Restaurants', 11, 'main', 'f800cd5bddcd1b0293f0b6965d8070c402632c3c086950217994ea4bccd16b9d', '[\"*\"]', NULL, NULL, '2023-07-14 12:51:28', '2023-07-14 12:51:28'),
(168, 'App\\Models\\User', 7, 'main', '867b1f0490392d4799e912ccbda45bcc73e437e32d131b49c84ccd8244ba120b', '[\"*\"]', NULL, NULL, '2023-09-23 01:05:54', '2023-09-23 01:05:54'),
(169, 'App\\Models\\User', 8, 'main', '1ab91d6fbcf42ff02f152483d0819708dba5bc0eeca835a09d453af770f1b639', '[\"*\"]', NULL, NULL, '2023-09-23 01:51:14', '2023-09-23 01:51:14'),
(170, 'App\\Models\\User', 9, 'main', '33ac6ded5bee3aa93120fd238696c0dabbba71eb9c7fd69bc2f8ab0d8fb9aa8a', '[\"*\"]', NULL, NULL, '2023-09-23 02:25:56', '2023-09-23 02:25:56'),
(171, 'App\\Models\\User', 10, 'main', 'c8ac77b8446dd58d06f85b0e6c6a112181110476d8fdb985d5148d86bd854dfc', '[\"*\"]', NULL, NULL, '2023-09-23 02:37:48', '2023-09-23 02:37:48'),
(204, 'App\\Models\\User', 3, 'main', 'bd46896f6fe42b26fe6d54a56f40d14785d0a6d7cd487432945530b636cdffcd', '[\"*\"]', '2023-11-02 09:22:37', NULL, '2023-11-02 05:00:50', '2023-11-02 09:22:37'),
(206, 'App\\Models\\Cashiers', 16, 'main', 'c554249b6db7100e350dc010a49f2d1d443bb769fa0c9f72571fd3f5a966bc5a', '[\"*\"]', '2023-11-02 06:00:29', NULL, '2023-11-02 05:59:47', '2023-11-02 06:00:29');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `floors` int(255) DEFAULT NULL,
  `monday` tinyint(1) DEFAULT NULL,
  `tuesday` tinyint(1) DEFAULT NULL,
  `wednesday` tinyint(1) DEFAULT NULL,
  `thursday` tinyint(1) DEFAULT NULL,
  `friday` tinyint(1) DEFAULT NULL,
  `saturday` tinyint(1) DEFAULT NULL,
  `sunday` tinyint(1) DEFAULT NULL,
  `opening` time DEFAULT NULL,
  `closing` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `restaurant_id`, `city`, `state`, `zip`, `description`, `cover`, `type`, `floors`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`, `opening`, `closing`, `created_at`, `updated_at`) VALUES
(1, 17, '07', 'Maitland Cres', 'Colombo 7', 'Good restaurant', 'https://img.freepik.com/free-photo/coffee-latte-with-cookies-coffiee-beans_141793-17440.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph', 'Both', 3, 1, 1, 1, 1, 1, 1, 0, '09:00:00', '22:00:00', '2023-07-27 12:51:27', '2023-07-27 12:51:27'),
(2, 16, '03', 'DS Senanayake Veediya', 'Kandy 2', 'Good One', 'https://img.freepik.com/free-photo/top-view-food-frame-with-copy-space_23-2148723447.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais', 'Table', 5, 1, 1, 0, 1, 1, 1, 0, '09:00:00', '22:00:00', '2023-07-27 12:53:00', '2023-08-10 07:22:43'),
(7, 5, '23', 'Canal Row', ' Colombo 00100', 'Good', 'https://img.freepik.com/premium-photo/grodno-belarus-march-2019-inside-interior-modern-pub-sport-bar-with-dark-loft-design-style-with-red-chairs_97694-3444.jpg?w=1060', 'Hall', 4, 1, 1, 1, 0, 0, 0, 0, '09:00:00', '22:00:00', '2023-08-31 08:20:10', '2023-08-31 08:20:10'),
(8, 2, '453', 'Galle Rd', 'Colombo 3', 'Good', 'https://img.freepik.com/free-photo/various-cakes-supermarket-shelves-sale_627829-7332.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais', 'Table', 3, 1, 1, 1, 1, 1, 0, 0, '10:00:00', '22:00:00', '2023-08-31 08:22:48', '2023-08-31 08:22:48'),
(9, 4, 'Maharagama', 'Colombo', '10345', 'Delightful haven for dessert enthusiasts and connoisseurs of all things sweet. Nestled in the heart of the city.', 'https://img.freepik.com/free-photo/small-coffee-shop-items-assortment_23-2149434610.jpg?size=626&ext=jpg&ga=GA1.1.1340233062.1698883508&semt=ais', 'Table', 1, 1, 1, 1, 1, 1, 0, 0, '07:00:00', '19:00:00', NULL, NULL),
(10, 1, 'Bambalapitiya ', 'Colombo', '10234', 'Our pastry shop is a delightful haven for those who appreciate the art of baking. ', 'https://img.freepik.com/free-photo/swimming-pool_74190-1977.jpg?w=1060&t=st=1698883526~exp=1698884126~hmac=f58c181ace59f41d6cc32f388d352b335ddf5d12eec76216ba3fa712d06d7120', 'Table', 1, 1, 1, 1, 1, 1, 1, 0, '05:00:00', '00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 15, 'Maharagama', 'Colombo', '10345', 'Delightful haven for dessert enthusiasts and connoisseurs of all things sweet. Nestled in the heart of the city.', 'https://img.freepik.com/free-photo/delicious-donut-shop-ai-generated_23-2150694730.jpg?size=626&ext=jpg&ga=GA1.1.1340233062.1698883508&semt=ais', 'Table', 1, 1, 1, 1, 1, 1, 1, 1, '07:00:00', '19:00:00', NULL, NULL),
(16, 11, 'Bambalapitiya ', 'Colombo', '10234', 'Our pastry shop is a delightful haven for those who appreciate the art of baking. ', 'https://img.freepik.com/free-photo/portrait-smiling-blonde-young-woman-holding-slice-cake-plate-coffee-shop_23-2148027990.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais', 'Table', 1, 1, 1, 1, 1, 1, 1, 1, '06:00:00', '22:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 7, 'Homagama', 'Colombo', '20456', 'The rich aroma of freshly brewed coffee greets you with a warm embrace.', 'https://img.freepik.com/free-photo/tasty-homemade-chocolate-truffle-cakes-with-coffee_114579-7393.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph', 'Table', 2, 1, 1, 1, 1, 1, 1, 1, '07:00:00', '23:00:00', NULL, NULL),
(18, 3, 'Lotus Rd', 'Colombo', '001112', 'where comfort meets convenience. Our hotel offers a welcoming retreat in the heart of the city, providing a comfortable and memorable stay.', 'https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph', 'Both', 5, 1, 1, 1, 1, 0, 1, 1, '00:00:00', '22:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `rateID` int(11) NOT NULL,
  `starCount` decimal(3,0) NOT NULL,
  `customerID` int(11) NOT NULL,
  `restaurantID` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rate`
--

INSERT INTO `rate` (`rateID`, `starCount`, `customerID`, `restaurantID`, `created_at`, `updated_at`) VALUES
(1, '5', 1, 1, NULL, NULL),
(2, '2', 2, 2, NULL, NULL),
(3, '2', 2, 3, NULL, NULL),
(4, '4', 3, 4, NULL, NULL),
(5, '5', 2, 17, NULL, NULL),
(6, '5', 2, 5, '2023-10-31 20:35:19', '2023-10-31 20:35:19'),
(7, '3', 2, 7, '2023-10-31 20:35:41', '2023-10-31 20:35:41'),
(8, '2', 2, 11, '2023-10-31 20:39:37', '2023-10-31 20:39:37'),
(9, '3', 2, 15, '2023-10-31 21:04:52', '2023-10-31 21:04:52'),
(10, '3', 2, 16, '2023-10-31 21:05:29', '2023-10-31 21:05:29'),
(11, '3', 2, 16, '2023-11-01 00:14:10', '2023-11-01 00:14:10'),
(12, '2', 2, 16, '2023-11-01 00:14:58', '2023-11-01 00:14:58'),
(13, '3', 2, 17, '2023-11-01 03:36:08', '2023-11-01 03:36:08'),
(14, '2', 3, 16, '2023-11-02 04:42:22', '2023-11-02 04:42:22'),
(15, '3', 3, 16, '2023-11-02 05:04:52', '2023-11-02 05:04:52'),
(16, '4', 3, 16, '2023-11-02 05:07:58', '2023-11-02 05:07:58'),
(17, '2', 3, 16, '2023-11-02 05:53:12', '2023-11-02 05:53:12');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurantname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brn` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mealType` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cuisineType` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `beverageType` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `rsetaurantType` longtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `restaurantname`, `brn`, `email`, `email_verified_at`, `name`, `phone`, `password`, `mealType`, `remember_token`, `created_at`, `updated_at`, `cuisineType`, `beverageType`, `rsetaurantType`) VALUES
(1, 'Galadari', 'HTy67', 'galadari@gmail.com', NULL, 'Aruna', '0712649734', '$2y$10$FPn6CBIFIm0DhhiVW.nHB.roq.vMJzgTUCizTeFoFNEeSJNOKfu1C', '[\"Dessert\"]', NULL, '2023-07-14 06:04:07', '2023-07-14 06:04:07', '[\"English\"]', '[\"Cold\"]', '[\"Luxury\"]'),
(2, 'Green Cabin', 'CFGT56', 'green@gmail.com', NULL, 'sumedha', '0712649734', '$2y$10$mhbvFKqLo4Rhdq3LZwg0B.TIjnEZzEQwJQD5i4Dc7nQ/RU0AkpU0e', '[\"Dessert\"]', NULL, '2023-07-14 07:03:49', '2023-07-14 07:03:49', '[\"English\"]', '[\"Cold\"]', '[\"Family\"]'),
(3, 'Boo cafe', 'FGT56', 'boo@gmail.com', NULL, 'Malith', '0712649734', '$2y$10$OOJISQI8rxN8RsFn3R6CLuY2h3hHRL0ghMMw73HohV7KkN05tZV5G', '[\"Dessert\"]', NULL, '2023-07-14 07:09:11', '2023-07-14 07:09:11', '[\"Sri Lankan\"]', '[\"Hot\"]', '[\"Family\"]'),
(4, 'Cusin Lovers', 'FTG67', 'cusin@gmail.com', NULL, 'Rohan', '0712649734', '$2y$10$xX3zaZy9vhR/CYzWtTrOAuMIHG4CLtmsqi4S9wR5ELuAo0U0wr08O', '[\"Snack\"]', NULL, '2023-07-14 07:16:08', '2023-07-14 07:16:08', '[\"Indian\"]', '[\"Hot\"]', '[\"Fast\"]'),
(5, 'KFC', 'GTY56', 'kfc@gmail.com', NULL, 'Amanda', '0712649734', '$2y$10$vN9xnMcIHQdemsX3uH7mBurypQRgzzu7r4LSpb2RD1GuIEXMUUam2', '[\"Snack\"]', NULL, '2023-07-14 11:53:49', '2023-07-14 11:53:49', '[\"English\"]', '[\"Natural\"]', '[\"Fast\"]'),
(7, 'Regnol Cafe', 'HYT56', 'cafe@gmail.com', NULL, 'Ashen', '0712649734', '$2y$10$bo2i2YyANKefCzNdjI86LOrGwamhaH3s8EqYvDi7VVkRTPZGufFee', '[\"Backery\"]', NULL, '2023-07-14 12:26:21', '2023-07-14 12:26:21', '[\"Indian\"]', '[\"Natural\"]', '[\"Casual\"]'),
(11, 'SFC', 'BGH65555', 'saban@gmail.com', NULL, 'Sunil', '0712649734', '$2y$10$DGPUd9oHHz0q23tDBfAKjO3d804m6/HS.g4OnnMGZxuANak0zX/8C', '[\"Snack\"]', NULL, '2023-07-14 12:51:28', '2023-08-08 14:14:33', '[\"Indian\"]', '[\"Natural\"]', '[\"Fast\"]'),
(15, 'Cake Pub', 'BH566', 'kaba@gmail.com', NULL, 'Bala', '0712649734', '$2y$10$q.oOz4PnGKb7H7iApeYLbOqsyXISDVSbXInmEJtlI/3DwJPcItWrG', '[\"Backery\"]', NULL, '2023-07-14 23:05:48', '2023-07-14 23:05:48', '[\"Italian\"]', '[\"Hot\"]', '[\"Cafe\"]'),
(16, 'Balaji Indian Cousine', 'BGH56', 'balaji@gmail.com', NULL, 'Balaji', '0712649734', '$2y$10$CkE7p.1E61.pZcgHmf13LuBtjeJGwr663WHNbvY3imZjLsYRlbIjy', '[\"Backery\"]', NULL, '2023-07-15 01:01:48', '2023-08-10 07:45:10', '[\"Indian\"]', '[\"Cold\"]', '[\"Cafe\"]'),
(17, 'Bean Cafe', 'BG54', 'pakoda@gmail.com', NULL, 'Vishwa', '0712649734', '$2y$10$nP9kuZ4gC19GyOXPPsW3M.GqGNbIH5RYaHG6.OH1m/gfitDIjxQR.', '[\"Backery\"]', NULL, '2023-07-15 13:09:11', '2023-07-15 13:09:11', '[\"Chinese\"]', '[\"Natural\"]', '[\"Cafe\"]');

-- --------------------------------------------------------

--
-- Table structure for table `tablefortwo`
--

CREATE TABLE `tablefortwo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reservationNumber` int(11) NOT NULL,
  `acceptedID` int(11) NOT NULL,
  `status` enum('pending','accepted','rejected','completed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tablefortwo`
--

INSERT INTO `tablefortwo` (`id`, `reservationNumber`, `acceptedID`, `status`, `created_at`, `updated_at`) VALUES
(1, 13, 3, 'completed', '2023-09-29 06:32:27', '2023-09-29 06:32:27'),
(2, 1, 5, 'completed', NULL, NULL),
(3, 10, 7, 'completed', '2023-10-01 13:07:02', '2023-10-01 13:07:02'),
(4, 15, 3, 'accepted', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 16, 0, 'pending', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 17, 3, 'accepted', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 18, 3, 'accepted', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 19, 0, 'pending', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 20, 3, 'accepted', '0000-00-00 00:00:00', '2023-11-01 00:10:50'),
(10, 21, 3, 'accepted', '0000-00-00 00:00:00', '2023-10-31 18:20:36'),
(11, 22, 0, 'accepted', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 23, 3, 'accepted', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 24, 3, 'accepted', '0000-00-00 00:00:00', '2023-11-01 00:06:36'),
(14, 30, 3, 'completed', '2023-10-08 13:08:38', '2023-10-08 13:08:38'),
(15, 31, 3, 'completed', '2023-10-08 13:08:38', '2023-10-08 13:08:38'),
(16, 32, 3, 'completed', '2023-10-08 13:08:38', '2023-10-08 13:08:38'),
(17, 40, 0, 'pending', NULL, NULL),
(18, 41, 0, 'pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `table_reservations`
--

CREATE TABLE `table_reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reservationNumber` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `reservation_date` date DEFAULT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `reservant_ID` int(11) DEFAULT NULL,
  `number_of_participants` int(11) NOT NULL,
  `table_structure_id` bigint(20) UNSIGNED NOT NULL,
  `tablefortwo` tinyint(1) NOT NULL DEFAULT 0,
  `status` int(1) DEFAULT 2,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `floor` int(11) NOT NULL DEFAULT 1,
  `table_number` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(20,0) NOT NULL DEFAULT 49
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `table_reservations`
--

INSERT INTO `table_reservations` (`id`, `reservationNumber`, `restaurant_id`, `reservation_date`, `start_time`, `end_time`, `reservant_ID`, `number_of_participants`, `table_structure_id`, `tablefortwo`, `status`, `created_at`, `updated_at`, `floor`, `table_number`, `price`) VALUES
(1, '23', 16, '2023-10-02', '18:00:00', '20:00:00', 1, 4, 9, 1, 0, '2023-08-10 11:09:33', '2023-08-15 18:18:20', 1, NULL, '49'),
(2, '20', 11, '2024-08-08', '11:30:00', '21:30:00', 2, 2, 10, 1, 0, '2023-08-10 11:09:33', '2023-08-15 18:18:16', 1, NULL, '49'),
(3, '24', 16, '2023-11-02', '11:00:00', '22:00:00', 1, 6, 11, 1, 0, '2023-08-10 11:09:33', '2023-08-11 17:57:26', 1, '7', '49'),
(4, '10', 16, '0000-00-00', '10:00:00', '19:00:00', 3, 3, 12, 1, 0, '2023-08-10 11:09:33', '2023-08-14 15:18:57', 2, NULL, '49'),
(39, '20', 16, '2023-11-16', '09:29:38', '11:29:38', 3, 1, 13, 1, 2, NULL, NULL, 1, NULL, '49'),
(40, '12', 16, '2023-10-03', '02:59:59', '03:23:59', 3, 5, 13, 1, 2, NULL, NULL, 2, NULL, '49'),
(41, '13', 3, '2023-09-29', '22:49:47', '23:49:47', 4, 4, 13, 1, 0, NULL, NULL, 2, NULL, '49'),
(42, '17', 15, '2023-10-08', '20:35:36', '21:35:36', 5, 2, 4, 1, 2, '2023-10-08 07:05:36', '2023-10-08 07:05:36', 2, NULL, '49'),
(43, '22', 4, '2023-10-11', '13:59:03', '16:59:03', 8, 2, 0, 1, 2, NULL, NULL, 1, NULL, '49'),
(44, '18', 15, '2023-11-13', '13:59:03', '16:59:03', 6, 2, 4, 1, 2, NULL, NULL, 1, NULL, '49'),
(45, '30', 15, '2023-10-10', '18:00:00', '20:00:00', 4, 2, 1, 1, 0, '2023-10-08 13:11:10', '2023-10-08 13:11:10', 1, NULL, '49'),
(46, '31', 15, '2023-10-11', '19:00:00', '21:00:00', 5, 3, 2, 1, 0, '2023-10-08 13:11:10', '2023-10-08 13:11:10', 2, NULL, '49'),
(47, '15', 15, '2023-11-02', '20:00:00', '22:00:00', 6, 4, 3, 1, 0, '2023-10-08 13:11:10', '2023-10-08 13:11:10', 3, NULL, '49'),
(48, '19', 15, '2023-11-23', '10:00:00', '11:00:00', 4, 2, 1, 1, 2, NULL, NULL, 1, NULL, '49'),
(50, '40', 2, '2023-11-22', '10:00:00', '11:00:00', 3, 2, 2, 1, 2, NULL, NULL, 1, NULL, '49'),
(51, '41', 2, '2023-12-22', '10:00:00', '10:30:00', 5, 1, 2, 1, 2, NULL, NULL, 1, NULL, '49'),
(56, '6779', 16, '2023-11-03', '10:00:00', '12:00:00', 2, 0, 12, 0, 2, '2023-10-30 19:48:14', '2023-10-30 19:48:14', 1, '5', '49'),
(57, '1688', 16, '2023-11-03', '10:00:00', '12:00:00', 2, 1, 12, 0, 2, '2023-10-30 19:48:44', '2023-10-30 19:48:44', 1, '5', '49'),
(60, '5095', 16, '2023-11-03', '10:00:00', '11:00:00', 2, 1, 15, 0, 2, '2023-10-31 00:40:05', '2023-10-31 00:40:05', 1, '8', '49'),
(61, '1674', 16, '2023-11-03', '10:00:00', '11:00:00', 2, 1, 10, 1, 2, '2023-10-31 00:41:35', '2023-10-31 00:41:35', 1, '3', '49'),
(62, '5797', 16, '2023-11-03', '10:00:00', '11:00:00', 2, 1, 9, 1, 2, '2023-10-31 00:41:48', '2023-10-31 00:41:48', 1, '2', '49'),
(63, '6405', 16, '2023-11-03', '10:00:00', '11:00:00', 2, 1, 11, 0, 2, '2023-11-01 04:00:02', '2023-11-01 04:00:02', 1, '4', '49'),
(64, '70', 16, '2023-11-02', '10:00:00', '11:00:00', 2, 1, 11, 0, 2, '2023-11-01 04:00:02', '2023-11-01 04:00:02', 1, '4', '49'),
(65, '5650eu', 16, '2023-11-03', '10:00:00', '11:00:00', 3, 1, 13, 0, 2, '2023-11-02 04:39:36', '2023-11-02 04:39:36', 1, '6', '49'),
(66, '0953tf', 16, '2023-11-03', '10:00:00', '11:00:00', 3, 1, 8, 0, 2, '2023-11-02 05:02:18', '2023-11-02 05:02:18', 1, '1', '49'),
(67, '8726kt', 16, '2023-11-03', '10:00:00', '11:00:00', 3, 1, 16, 0, 2, '2023-11-02 05:48:49', '2023-11-02 05:48:49', 1, '7,9', '49');

-- --------------------------------------------------------

--
-- Table structure for table `table_structures`
--

CREATE TABLE `table_structures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `table_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `floor` int(11) NOT NULL DEFAULT 1,
  `number_of_chairs` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `view` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `posX` int(11) NOT NULL,
  `posY` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `table_structures`
--

INSERT INTO `table_structures` (`id`, `restaurant_id`, `table_id`, `table_number`, `floor`, `number_of_chairs`, `view`, `posX`, `posY`, `created_at`, `updated_at`) VALUES
(1, 17, '2', '1', 0, '5', '3', 2, 1, '2023-07-26 06:35:26', '2023-07-26 06:35:26'),
(2, 17, '13', '2', 0, '4', '2', 2, 2, '2023-07-26 07:02:44', '2023-07-26 07:02:44'),
(3, 17, '43', '4', 0, '4', '8', 10, 4, '2023-07-26 07:04:04', '2023-07-26 07:04:04'),
(4, 17, '44', '5', 0, '4', '3', 0, 4, '2023-07-26 07:08:53', '2023-07-26 07:08:53'),
(6, 17, '22', '3', 0, '3', '9', 11, 2, '2023-07-26 07:15:01', '2023-07-26 07:15:01'),
(7, 17, '14', '6', 0, '3', '16', 3, 1, '2023-08-12 18:44:47', '2023-08-12 18:44:47'),
(8, 16, '1', '1', 2, '4', '23', 1, 0, '2023-08-15 05:04:57', '2023-08-15 05:04:57'),
(9, 16, '2', '2', 1, '4', '23', 2, 0, '2023-08-15 05:05:20', '2023-08-15 05:05:20'),
(10, 16, '3', '3', 1, '4', '23', 3, 0, '2023-08-15 05:05:47', '2023-08-15 05:05:47'),
(11, 16, '9', '4', 1, '4', '23', 9, 0, '2023-08-15 05:06:33', '2023-08-15 05:06:33'),
(12, 16, '10', '5', 2, '4', '23', 10, 0, '2023-08-15 05:06:56', '2023-08-15 05:06:56'),
(13, 16, '11', '6', 2, '4', '23', 11, 1, '2023-08-15 05:07:17', '2023-08-15 05:07:17'),
(14, 16, '20', '7', 3, '4', '23', 9, 1, '2023-08-20 02:55:52', '2023-08-20 02:55:52'),
(15, 16, '14', '8', 4, '3', '23', 3, 1, '2023-08-21 02:27:56', '2023-08-21 02:27:56'),
(16, 16, '31', '9', 5, '6', '23', 9, 2, '2023-08-23 11:02:36', '2023-08-23 11:02:36'),
(17, 16, '29', '12', 2, '3', '23', 7, 2, '2023-09-11 01:35:43', '2023-09-11 01:35:43');

-- --------------------------------------------------------

--
-- Table structure for table `technicalassistancerequest`
--

CREATE TABLE `technicalassistancerequest` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(5) NOT NULL,
  `issue_description` mediumtext NOT NULL,
  `priority` varchar(200) NOT NULL,
  `status` tinyint(12) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `technical_assistances`
--

CREATE TABLE `technical_assistances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `issue_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Awaiting',
  `reply` varchar(10000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `technical_assistances`
--

INSERT INTO `technical_assistances` (`id`, `restaurant_id`, `issue_description`, `priority`, `status`, `reply`, `created_at`, `updated_at`) VALUES
(1, 16, 'I am not able to add my views. I need help with that.', 'critical', 'Not Solved', 'Thankyou for contacting us. We will look in to your issue.', '2023-09-12 03:41:19', '2023-10-30 10:45:44'),
(2, 16, 'I have a issue in adding the table structure. I need help with that.', 'medium', 'Not Solved', NULL, '2023-09-12 03:48:44', '2023-10-30 10:46:22'),
(3, 16, 'I have a issue in adding the table structure. I need help with that.', 'medium', 'Not Solved', NULL, '2023-09-12 03:48:47', '2023-10-30 10:51:03'),
(4, 16, 'I am not able to add my views. I need help with that.', 'medium', 'Not Solved', NULL, '2023-09-12 03:49:18', '2023-10-30 10:56:54'),
(5, 16, 'I have a issue in adding the table structure. I need help with that.', 'low', 'Awaiting', NULL, '2023-10-29 09:34:01', '2023-10-29 09:34:01'),
(6, 16, 'I have a issue in adding the table structure. I need help with that.', 'low', 'Awaiting', NULL, '2023-10-29 09:34:07', '2023-10-29 09:34:07'),
(7, 16, 'I am not able to add my views. I need help with that.', 'low', 'Awaiting', NULL, '2023-10-29 09:34:11', '2023-10-29 09:34:11'),
(8, 16, 'I am not able to add my views. I need help with that.', 'low', 'Awaiting', NULL, '2023-10-29 09:41:26', '2023-10-29 09:41:26'),
(9, 16, 'I am not able to add my views. I need help with that.', 'low', 'Awaiting', NULL, '2023-10-29 09:43:45', '2023-10-29 09:43:45'),
(10, 16, 'I am not able to add my views. I need help with that.', 'low', 'Awaiting', NULL, '2023-10-29 20:58:19', '2023-10-29 20:58:19'),
(11, 16, 'I am not able to add my views. I need help with that.', 'high', 'Awaiting', NULL, '2023-10-29 21:04:18', '2023-10-29 21:04:18'),
(12, 16, 'kkk', 'low', 'Awaiting', NULL, '2023-10-29 21:10:04', '2023-10-29 21:10:04'),
(13, 16, 'kk', 'low', 'Awaiting', NULL, '2023-10-29 21:11:27', '2023-10-29 21:11:27'),
(14, 16, 'helo', 'low', 'Awaiting', NULL, '2023-10-29 21:12:51', '2023-10-29 21:12:51'),
(15, 16, 'ffx', 'low', 'Awaiting', NULL, '2023-10-29 21:13:53', '2023-10-29 21:13:53'),
(16, 16, 'iiik', 'low', 'Awaiting', NULL, '2023-10-29 21:15:21', '2023-10-30 06:13:33'),
(17, 16, 'kjkk', 'low', 'Awaiting', NULL, '2023-10-29 21:34:35', '2023-10-29 21:34:35'),
(18, 16, 'kio', 'low', 'Awaiting', NULL, '2023-10-29 21:46:17', '2023-10-29 21:46:17'),
(19, 16, 'kop', 'low', 'Awaiting', NULL, '2023-10-29 22:38:32', '2023-10-29 22:38:32');

-- --------------------------------------------------------

--
-- Table structure for table `time_availabilities`
--

CREATE TABLE `time_availabilities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `slot_date` date NOT NULL,
  `availability` tinyint(1) NOT NULL DEFAULT 0,
  `hall_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `time_availabilities`
--

INSERT INTO `time_availabilities` (`id`, `start_time`, `end_time`, `slot_date`, `availability`, `hall_id`, `created_at`, `updated_at`) VALUES
(1, '08:30:00', '12:30:00', '2023-08-28', 0, 1, NULL, NULL),
(2, '14:30:00', '18:30:00', '2023-08-28', 0, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transactionID` bigint(20) NOT NULL,
  `reservatuinID` bigint(20) NOT NULL,
  `amount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `hometown` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` blob DEFAULT NULL,
  `about` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mealPreferences` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`mealPreferences`)),
  `cuisineType` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `beverageType` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `rsetaurantType` longtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `hometown`, `lastname`, `dob`, `gender`, `photo`, `about`, `mealPreferences`, `cuisineType`, `beverageType`, `rsetaurantType`) VALUES
(1, 'Madushi', 'ana@gmail.com', NULL, '$2y$10$IvA8wcA9Aguu/xg2lLUDheV4wbAP4bY38Kg7Gk801sCvbxDLAZY76', NULL, '2023-08-27 19:08:11', '2023-08-27 19:08:11', 'Kottawa', 'Amarasinghe', '2000-10-05', 'F', NULL, 'John is a passionate software engineer with a love for coding and problem-solving.', '[\"Backery\"]', '[\"Indian\"]', '[\"Cold\"]', ''),
(2, 'Vimukthi', 'nimal123@gmail.com', NULL, '$2y$10$ObQZtRmxX5Ms/hUFH.u5ZuPMkD4BnTL2MDsBjxYMDV1QLHa/25SQi', NULL, '2023-09-03 23:47:56', '2023-09-03 23:47:56', 'Pannipitiya', 'Amaraweera', '2000-07-11', 'M', NULL, 'John is a passionate software engineer with a love for coding and problem-solving.', '[\"Backery\"]', '[\"Indian\"]', '[\"Hot\"]', ''),
(3, 'Nethum', 'test@email.com', NULL, '$2y$10$ShH6TGeevVI9Uq7b6j2kV.YGqPsdQfMa07ntI13c493Ys2aBrbNUq', NULL, '2023-09-12 10:44:07', '2023-09-12 10:44:07', 'Pannipitiya', 'Weerasinghe', '2009-10-05', 'M', NULL, 'John is a passionate software engineer with a love for coding and problem-solving.', '[\"Dessert\"]', '[\"Indian\"]', '[\"Hot\"]', '[\"Cafe\"]'),
(4, 'Nisal', 'Ho@email.com', NULL, '$2y$10$MvInVzW1lw1gAmm/nsVXIeArVz8I.UXitrUx5UtHqfD00m.RBQCGm', NULL, '2023-09-19 20:51:30', '2023-09-19 20:51:30', 'Abagasmulla', 'Jayarathna', '2000-07-24', 'M', NULL, 'John is a passionate software engineer with a love for coding and problem-solving.', '[\"Snack\"]', '', '[\"Cold\"]', ''),
(5, 'Samadhi', 'testrtt@email.com', NULL, '$2y$10$Eo7GNMHU5iZCU.wsE7qcU.zemkyOa7lqdskBaaNYnMVjhQQv.gDga', NULL, '2023-09-22 04:30:27', '2023-09-22 04:30:27', 'Thumpane', 'Anuththara', '2000-10-05', 'M', NULL, 'John is a passionate software engineer with a love for coding and problem-solving.', '[\"Snack\"]', '', '[\"Cold\"]', ''),
(6, 'Kisal', 'tyio@email.com', NULL, '$2y$10$Xs1DJhVvnVoHPyYJfjFyw.uwBjA8mUhvO7DCEIuoriP2uOuUhVzti', NULL, '2023-09-22 23:58:31', '2023-09-22 23:58:31', 'Rajagiriya', 'Padmasinghe', '1999-10-05', 'F', NULL, 'Living my life', '[\"Dessert\"]', '', '[\"Cold\"]', ''),
(7, 'Pasan', 'test1234500@email.com', NULL, '$2y$10$xW/pji4MMh40XCcHNRsjwOKm1zw26lTGLn.x0dHRhCAShEJilwYTS', NULL, '2023-09-23 01:05:54', '2023-09-23 01:05:54', 'Dambulla', 'Padmasinghe', '2000-10-05', 'F', NULL, 'John is a passionate software engineer with a love for coding and problem-solving.', '[\"Dessert\"]', '', '', ''),
(8, 'Visal', 'test101010101@email.com', NULL, '$2y$10$bbYmT6FJgZEIBStxCQKBveVikM2KdJJdWWZNjJ79eRTl/Gvfuv.cO', NULL, '2023-09-23 01:51:14', '2023-09-23 01:51:14', 'Pannipitiya', 'Weerasinghe', '2000-10-05', 'M', NULL, 'Coffee for you and me', '[\"Bakery\"]', '', '', ''),
(9, 'Sidarth', 'sweam@email.com', NULL, '$2y$10$EVuWHBHW9PYuu05Mmv6fyu61w0HHQm6ziBzyoVGTCxcjMbSskM1EC', NULL, '2023-09-23 02:25:56', '2023-09-23 02:25:56', 'Kirulapana', 'Jayasinghe', '1960-10-05', 'M', NULL, 'Riding the wind', '[\"Bakery\"]', '', '', ''),
(10, 'Lasindu', 'swdeam@email.com', NULL, '$2y$10$LqBUqvJg/jUG8CsuRbM7neBAFS7j4eO2X7sANoEHcTCg21Q4K6lPC', NULL, '2023-09-23 02:37:48', '2023-09-23 02:37:48', 'Sabaragamuwa', 'Jayasinghe', '1998-11-25', 'M', NULL, 'Fun and fun', '[\"Snack\"]', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `restaurant_id`, `name`, `photo`, `description`, `created_at`, `updated_at`) VALUES
(13, 16, ' Courtyard View', 'uploads/views/1691602726.jpg', 'a good view to see', '2023-08-09 12:08:46', '2023-08-09 12:08:46'),
(16, 17, 'Rooftop View', 'uploads/views/1691603911.jpg', 'mama', '2023-08-09 12:28:31', '2023-08-09 12:28:31'),
(17, 17, 'Terrace View', 'uploads/views/1691605534.jpg', 'gaya', '2023-08-09 12:55:34', '2023-08-09 12:55:34'),
(20, 17, 'Bar View', 'uploads/views/1691692778.jpg', 'bar view', '2023-08-10 13:09:38', '2023-08-10 13:09:38'),
(21, 17, 'Sea View', 'uploads/views/1691904849.jpg', 'Can sea view', '2023-08-13 00:04:09', '2023-08-13 00:04:09'),
(23, 16, 'Sea View', 'uploads/views/1692115465.jpg', 'Open area', '2023-08-15 10:34:25', '2023-08-15 10:34:25');

-- --------------------------------------------------------

--
-- Table structure for table `waitlists`
--

CREATE TABLE `waitlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `selected_slot_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL DEFAULT 17
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `waitlists`
--

INSERT INTO `waitlists` (`id`, `name`, `email`, `selected_slot_id`, `user_id`, `created_at`, `updated_at`, `restaurant_id`) VALUES
(1, 'Vimukthi', 'vimukthidulnath@gmail.com', 3, 1, '2023-10-30 06:45:45', '2023-10-30 06:45:45', 17),
(2, 'Vimukthi', 'vimukthidulnath@gmail.com', 3, 1, '2023-10-30 06:48:08', '2023-10-30 06:48:08', 17),
(3, '2020cs013', 'vimukthidulnath@gmail.com', 3, 1, '2023-10-30 06:53:23', '2023-10-30 06:53:23', 17),
(4, 'Vimukthi', 'v@g.c', 3, 1, '2023-10-30 06:55:33', '2023-10-30 06:55:33', 17),
(5, 'samadhi', 'samadhi@gmail.com', 3, 1, '2023-10-31 21:23:03', '2023-10-31 21:23:03', 17),
(6, 'samadhi', 'anuththara@gmail.com', 3, 1, '2023-10-31 21:24:44', '2023-10-31 21:24:44', 17),
(7, 'sama', 'sa@g.c', 3, 1, '2023-11-02 04:40:18', '2023-11-02 04:40:18', 17),
(8, 'vimukthi', 'vimukthidulnath@gmail.com', 3, 1, '2023-11-02 05:51:21', '2023-11-02 05:51:21', 17);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cashiers`
--
ALTER TABLE `cashiers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cashiers_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`complaintID`),
  ADD KEY `fk_complaints_customers` (`userID`),
  ADD KEY `fk_complaints_restaurants` (`restaurantID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `halls`
--
ALTER TABLE `halls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `halls_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `halls_slots`
--
ALTER TABLE `halls_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_halls` (`hall_id`);

--
-- Indexes for table `hall_reservations`
--
ALTER TABLE `hall_reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `fk_slot_id` (`Slot_id`),
  ADD KEY `fk_halls_id` (`hall_id`);

--
-- Indexes for table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meals_restaurant_id_foreign` (`restaurant_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `meal_reservations`
--
ALTER TABLE `meal_reservations`
  ADD PRIMARY KEY (`mealReservationID`),
  ADD KEY `fk_res_id` (`restaurantID`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monthly_payments`
--
ALTER TABLE `monthly_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `offers_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`rateID`),
  ADD KEY `fk_rate_restaurant` (`restaurantID`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `restaurants_email_unique` (`email`);

--
-- Indexes for table `tablefortwo`
--
ALTER TABLE `tablefortwo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_reservations`
--
ALTER TABLE `table_reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `table_reservations_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `table_structures`
--
ALTER TABLE `table_structures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `table_structures_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `technicalassistancerequest`
--
ALTER TABLE `technicalassistancerequest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technical_assistances`
--
ALTER TABLE `technical_assistances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `technical_assistances_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `time_availabilities`
--
ALTER TABLE `time_availabilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `time_availabilities_hall_id_foreign` (`hall_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transactionID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `views_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `waitlists`
--
ALTER TABLE `waitlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_restaurant_id` (`restaurant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `cashiers`
--
ALTER TABLE `cashiers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `complaintID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `halls`
--
ALTER TABLE `halls`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `halls_slots`
--
ALTER TABLE `halls_slots`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hall_reservations`
--
ALTER TABLE `hall_reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `monthly_payments`
--
ALTER TABLE `monthly_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `rate`
--
ALTER TABLE `rate`
  MODIFY `rateID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tablefortwo`
--
ALTER TABLE `tablefortwo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `table_reservations`
--
ALTER TABLE `table_reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `table_structures`
--
ALTER TABLE `table_structures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `technicalassistancerequest`
--
ALTER TABLE `technicalassistancerequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `technical_assistances`
--
ALTER TABLE `technical_assistances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `time_availabilities`
--
ALTER TABLE `time_availabilities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transactionID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `waitlists`
--
ALTER TABLE `waitlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cashiers`
--
ALTER TABLE `cashiers`
  ADD CONSTRAINT `cashiers_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `halls`
--
ALTER TABLE `halls`
  ADD CONSTRAINT `halls_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `meal_reservations`
--
ALTER TABLE `meal_reservations`
  ADD CONSTRAINT `fk_res_id` FOREIGN KEY (`restaurantID`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `offers`
--
ALTER TABLE `offers`
  ADD CONSTRAINT `offers_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `fk_rate_restaurant` FOREIGN KEY (`restaurantID`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `table_reservations`
--
ALTER TABLE `table_reservations`
  ADD CONSTRAINT `table_reservations_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `table_structures`
--
ALTER TABLE `table_structures`
  ADD CONSTRAINT `table_structures_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `technical_assistances`
--
ALTER TABLE `technical_assistances`
  ADD CONSTRAINT `technical_assistances_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `time_availabilities`
--
ALTER TABLE `time_availabilities`
  ADD CONSTRAINT `time_availabilities_hall_id_foreign` FOREIGN KEY (`hall_id`) REFERENCES `halls` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `views`
--
ALTER TABLE `views`
  ADD CONSTRAINT `views_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `waitlists`
--
ALTER TABLE `waitlists`
  ADD CONSTRAINT `fk_restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
