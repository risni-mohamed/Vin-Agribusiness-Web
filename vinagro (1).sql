-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2026 at 08:22 AM
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
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'kamal', 'kamal@gmail.com', 'good', '2025-09-22 06:13:36'),
(2, 'Mohamed Rizni', 'mohamadrizni42@gmail.com', 'Best Products', '2025-09-22 06:38:54');

-- --------------------------------------------------------

--
-- Table structure for table `fertilizers`
--

CREATE TABLE `fertilizers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(10) DEFAULT 0,
  `unit` enum('ml','l','g','kg') DEFAULT 'kg',
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fertilizers`
--

INSERT INTO `fertilizers` (`id`, `name`, `description`, `category`, `price`, `quantity`, `unit`, `image1`, `image2`, `image3`, `created_at`) VALUES
(2, 'vin tea', 'dfhhdfidhdf', 'Straight Fertilizers', 3000.00, 1000, 'g', '1760072501196-vin agribusiness artwork.jpg', NULL, NULL, '2025-09-25 07:04:29');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `media_type` enum('video','news') NOT NULL,
  `description` text DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `title`, `media_type`, `description`, `file`, `created_at`) VALUES
(7, 'fertilizer', 'news', 'dgdhfriughworughwrjgeeugeuoghei', 'media-1759141690401.png', '2025-09-24 04:09:20'),
(8, 'fertilizer', 'video', 'uhgyugihogyg', 'media-1758690847348.mp4', '2025-09-24 05:14:07'),
(9, 'What is PeptiColor? The Science Behind Brighter Color, Sweeter Taste, and Longer Shelf Life for Fruits', 'news', 'What is PeptiColor? The Science Behind Brighter Color, Sweeter Taste, and Longer Shelf Life for Fruits\r\nThe Challenges of Modern Fruit Production\r\nAchieving uniformly colored, sweet, and long-lasting fruits remains a critical challenge for growers. Studies show that up to 30% of fruits are lost post-harvest due to poor color development, uneven ripening, or rapid decay. Traditional fertilizers often fail to address these interconnected issues—until now.\r\n\r\nPeptiColor redefines fruit quality enhancement by combining cutting-edge biotechnology with precision nutrition. Let’s explore how this innovative formula unlocks higher market value for your harvest.\r\n\r\nWhat is PeptiColor? A Breakthrough in Fruit Quality Optimization\r\nPeptiColor is a multi-functional foliar fertilizer engineered to simultaneously enhance fruit coloration, sweetness, and storability. Its advanced formula leverages:\r\n\r\nAnimal-derived bioactive peptides for rapid nutrient absorption.\r\nChelated trace minerals (Zn, Fe, Mn) to strengthen cellular structures.\r\nAstaxanthin-rich color-enhancing factors extracted from Phaffia rhodozyma yeast.\r\nPlant-specific transport boosters to ensure full nutrient delivery.\r\nCore Technology: How It Works\r\n1. Bioactive Peptides: The Direct Nutrient Pathway\r\nUnique enzymatic hydrolysis produces >80% oligopeptides (vs. <30% in conventional hydrolysates).\r\nAdvantage over amino acids: Peptides bypass metabolic bottlenecks, enabling 3x faster uptake by fruit cells.\r\nSynergy with minerals: Chelated Ca/Mg binds to peptide carriers, boosting translocation to fruits.\r\n2. Astaxanthin: The Dual-Action Color & Sugar Catalyst\r\nMechanism:\r\nOxidative activation: Penetrates cuticles to stimulate sugar accumulation (+18–25% Brix).\r\nCarotenoid conversion: Upregulates anthocyanin synthase (ANS) genes for vibrant red/purple hues.\r\nProven outcome: Trials show 5-day earlier coloration in grapes with 95% uniform pigmentation.\r\n3. Transport Boosters: Maximizing Nutrient Efficiency\r\nC12-14 alkyl glucosides reduce surface tension, ensuring 98% droplet retention even on waxy fruit skins.\r\nPhloem-mobile carriers target nutrients to ripening fruits, not leaves.', 'media-1758878211352.jpg', '2025-09-26 09:16:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fertilizers`
--
ALTER TABLE `fertilizers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
