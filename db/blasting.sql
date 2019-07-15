-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2019 at 05:28 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blasting`
--

-- --------------------------------------------------------

--
-- Table structure for table `groupcontact`
--

CREATE TABLE `groupcontact` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groupcontact`
--

INSERT INTO `groupcontact` (`id`, `name`, `status`) VALUES
(1, 'Mandaluyong', 1),
(2, 'San Juan1x', 0),
(3, 'Quezon City', 1);

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `contact` text NOT NULL,
  `group_contact` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `name`, `contact`, `group_contact`, `status`) VALUES
(1, 'Ricardo Osits', '9055130156', 1, 1),
(2, 'Tanya Markova', '9282663758', 3, 1),
(3, 'Ferdinan Magellan', '9490409250', 0, 0),
(4, 'Ferdinand Magellan', '9282663758', 0, 0),
(5, 'Fedinand Magellan', '9282663758', 0, 0),
(6, 'Ferdinand Magellans', '9282663758', 0, 0),
(7, 'Ferdinand Magellan', '9282663758', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `added` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `added`) VALUES
(1, 'ricky', '$2y$12$KWEkh2xlYFDUdMnjPuZ4sOs8E.7vlcs4qaw98Q5C54QQRyuLKj7lS', '2019-05-15 17:02:22'),
(2, 'xricky', '$2y$12$rv2ngFXkepk/APygkB2rauJV5Wvre2ev5TeVsAfrT/iuATj2x2L6G', '2019-05-15 17:03:50'),
(3, 'ricky12', '$2y$12$bI/mHPo.a86/JbnHtN9VN.7DkYW2MdQqczm3LmhnbbU47SCnhGBTC', '2019-05-15 17:04:23'),
(6, 'root', '$2y$12$iyDLOCtrQ72lPiHB406HR.7ljiniWssg7ACrsUMy9ciF3n4n2gd3u', '2019-07-15 01:35:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groupcontact`
--
ALTER TABLE `groupcontact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groupcontact`
--
ALTER TABLE `groupcontact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
