-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2026 at 06:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vinagro`
--

-- --------------------------------------------------------

--
-- Table structure for table `crop_programs`
--

CREATE TABLE `crop_programs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `flyer` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `crop_programs`
--

INSERT INTO `crop_programs` (`id`, `name`, `image`, `flyer`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'පේර | Guava', 'crop-programs/images/0P4AiBnUDxpSS9C2FQBw52Jf17agqXKiyMYgrVrS.png', 'crop-programs/flyers/HddoYOHEOpHi6FXxKml8nzwi6op5Rmjc2JaSnAcN.jpg', 0, '2026-03-26 01:26:26', '2026-03-26 01:31:58'),
(2, 'කෙසෙල් | Banana', 'crop-programs/images/I6egZPTr8FFnB3jqc3NbDHndMam5zIEnTRgyWrEm.webp', 'crop-programs/flyers/ZfaZ5ba2NYvQLzzk3vanpbjKNP3RHGh99HLYueFm.jpg', 1, '2026-03-26 01:31:16', '2026-03-26 01:31:16'),
(3, 'පැපොල් | Papaya', 'crop-programs/images/InZcvPvmD0QA6b7l8WPCIWj2V9zI1GhU0HXO8o2E.jpg', 'crop-programs/flyers/FKuLwDKQK1X3dX4qxF2bGbGgfDHnXEWNQ2XoXRml.jpg', 2, '2026-03-26 01:34:37', '2026-03-26 01:34:37'),
(4, 'මිරිස් | Chilli', 'crop-programs/images/3jGqMhmJ34oMGIClqFWOadIBAdkRokMwoI0k9F1s.jpg', 'crop-programs/flyers/9HYhZ6R3Y3XI68hhkqASzw88C9aowFapgv8hRXwW.jpg', 3, '2026-03-26 01:36:51', '2026-03-26 01:36:51'),
(5, 'මාළු මිරිස් | Capsicum', 'crop-programs/images/f2rsfmQT8nR69XShptd4pg5hnVNQwMsN395V1wyE.jpg', 'crop-programs/flyers/I0dpHW8zoIjyKQJh1xs6ugAzDNIqJmN5B5j7HAp7.jpg', 4, '2026-03-26 01:38:54', '2026-03-26 01:38:54'),
(6, 'මැහි බෝග | Bitter Gourd', 'crop-programs/images/pOXa3Vp2Y1JmAwpTjis6OL1zmNNZBLfRKNWJIZxH.jpg', 'crop-programs/flyers/fSfyMUQ2MxLpQeQrvbFb4i481yVW3YMBwjIAlL0d.jpg', 5, '2026-03-26 01:44:30', '2026-03-26 01:44:30');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `name`, `email`, `message`, `is_visible`, `created_at`, `updated_at`) VALUES
(2, 'Rizni', 'mohamadrizni42@gmail.com', 'Good products', 1, '2026-03-09 21:53:37', '2026-03-09 21:57:43'),
(3, 'Rizni', 'nimanthasandun2@gmail.com', 'efghjgfwhf', 0, '2026-03-09 22:25:30', '2026-03-09 23:17:47');

-- --------------------------------------------------------

--
-- Table structure for table `fertilizers`
--

CREATE TABLE `fertilizers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `unit` enum('ml','l','g','kg') NOT NULL DEFAULT 'kg',
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fertilizers`
--

INSERT INTO `fertilizers` (`id`, `name`, `description`, `category`, `price`, `quantity`, `unit`, `image1`, `image2`, `image3`, `created_at`, `updated_at`) VALUES
(2, 'ceeba', 'ehfjiehjkqhjkhqjlvhlql', 'Paddy Fertilizers', 10000.00, 50, 'kg', 'fertilizers/trMApakZb40aoSpMZXjGjPRzJXJ8ipFyBCZzCrn5.png', 'fertilizers/6wx4fmluS8h5kh5omGjNWuOo7a73wSIJAxVD2AwW.png', NULL, '2026-03-09 03:34:08', '2026-03-09 03:34:08');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `media_type` enum('video','news') NOT NULL,
  `description` text DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `title`, `media_type`, `description`, `file`, `created_at`, `updated_at`) VALUES
(1, 'Climate Stress Grows, SEWA Equips Women Farmers With New Tools', 'news', 'come together as poor, as women, and as workers, no matter what caste, community, or religion they belong to,” says SEWA’s Reema Nanavaty.', 'media/qYZE1VhCEuna2YYtH8X24qZgQUEPl7Z5oXrDCUov.jpg', '2026-03-09 02:45:23', '2026-03-09 03:48:17'),
(2, 'ICE’s Impact on Food Security, as Seen Through Joyce Uptown Food Shelf', 'news', 'Minneapolis food shelves have been forced to innovate like never before to meet the community’s need.', 'media/3gIi5lmG1B9BfGVWcwdagoMEabvmWPlx2U1eaKwV.jpg', '2026-03-09 04:30:23', '2026-03-09 04:30:23');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_03_09_072925_create_fertilizers_table', 1),
(5, '2026_03_09_072926_create_feedbacks_table', 1),
(6, '2026_03_09_072926_create_media_table', 1),
(7, '2026_03_09_073551_create_personal_access_tokens_table', 1),
(8, '2026_03_09_999999_create_feedbacks_table', 2),
(9, '2026_03_09_999999_rename_feedbacks_table', 3),
(10, '2026_03_10_999999_add_is_visible_to_feedback_table', 4),
(11, '2026_03_26_000001_create_crop_programs_table', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crop_programs`
--
ALTER TABLE `crop_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fertilizers`
--
ALTER TABLE `fertilizers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crop_programs`
--
ALTER TABLE `crop_programs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fertilizers`
--
ALTER TABLE `fertilizers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
