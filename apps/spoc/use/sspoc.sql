-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 05, 2017 at 06:37 AM
-- Server version: 5.7.18-0ubuntu0.16.04.1
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sspoc`
--

-- --------------------------------------------------------

--
-- Table structure for table `survey`
--

CREATE TABLE `survey` (
  `Ind` int(6) NOT NULL,
  `Scale` varchar(11) NOT NULL,
  `Survey_plan_type` varchar(100) NOT NULL,
  `Survey_method` varchar(11) NOT NULL,
  `Instrument` varchar(11) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `Abbutals` varchar(100) NOT NULL,
  `Plan_name` varchar(100) NOT NULL,
  `coordinate_system` varchar(100) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `file` varchar(64) DEFAULT NULL,
  `filecsv` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `survey`
--

INSERT INTO `survey` (`Ind`, `Scale`, `Survey_plan_type`, `Survey_method`, `Instrument`, `Location`, `Abbutals`, `Plan_name`, `coordinate_system`, `userid`, `file`, `filecsv`) VALUES
(1, '1', 'Amalgamation', 'Advanced', '0', 'Nairobi', 'jkia', '', 'CAssini Soldner', '', '', NULL),
(2, '1', 'Change Of User', 'Advanced', '0', 'Machakos', 'home', 'jkuat', 'WGS84', '', '', NULL),
(3, '1:10000', 'Change Of User', 'Advanced', '0', 'Machakos', 'home', 'jkuat', 'WGS84', '', '', NULL),
(4, '1:1000', 'Re-establishment', 'conventiona', 'RTK', 'Nairobi', '657,876,9884', 'othaya Subdivision', 'UTM', '', '', NULL),
(5, '1:1000', 'Re-establishment', 'conventiona', 'RTK', 'Nairobi', '657,876,9884', 'othaya Subdivision', 'UTM', '', '', NULL),
(6, '1:1000', 'Re-establishment', 'Advanced', 'RTK', 'Nairobi', 'ab', 'ontret', 'UTM', '', '', NULL),
(7, '1:1000', 'Re-establishment', 'Advanced', 'RTK', 'Nairobi', 'ab', 'ontret', 'UTM', '', '', NULL),
(8, '1:500', 'Subdivision', 'conventiona', 'Total Stati', 'Nairobi', 'ab', 'prert', 'UTM', '', '', NULL),
(9, '1:500', 'Subdivision', 'conventiona', 'Total Stati', 'Nairobi', 'ab', 'prert', 'UTM', '', '', NULL),
(10, '1:500', 'Subdivision', 'conventiona', 'Total Stati', 'Nairobi', 'ab', 'prert', 'UTM', '', '', NULL),
(11, '1:500', 'Subdivision', 'conventiona', 'Total Stati', 'Nairobi', 'ab', 'yung', 'UTM', '', '', NULL),
(12, '1:500', 'Subdivision', 'UTM', 'UTM', 'Nairobi', 'Conventional', 'planname', 'UTM', '', '', NULL),
(13, '1:500', 'Subdivision', 'UTM', 'UTM', 'Nairobi', 'Conventional', 'Another plan', 'UTM', '', '', NULL),
(14, '1:500', 'Subdivision', 'UTM', 'UTM', 'Nairobi', 'Conventional', 'asd', 'UTM', '', '', NULL),
(15, '1:500', 'Subdivision', 'UTM', 'UTM', 'Nairobi', 'Conventional', 'asd', 'UTM', '593445e4903b3321d04ca0c2', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `surveyor`
--

CREATE TABLE `surveyor` (
  `FirstName` varchar(100) NOT NULL,
  `SecondName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `PhoneNumber` int(100) NOT NULL,
  `Assistant` varchar(100) NOT NULL,
  `ID` int(100) NOT NULL,
  `password` int(11) NOT NULL,
  `licence_number` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surveyor`
--

INSERT INTO `surveyor` (`FirstName`, `SecondName`, `Email`, `PhoneNumber`, `Assistant`, `ID`, `password`, `licence_number`) VALUES
('Brian', 'Ouma', 'ajshjhsj@gmail.com', 705050050, 'Dennis Kamau', 1, 0, 4830303),
('kennedy ', 'kubasu', 'kubasu@highlandsurveyors.com', 722657321, 'munialo', 2, 0, 166),
('Dancun', 'sentre', 'sdsfsf@gmail.com', 701232678, 'Grandi', 3, 0, 6868);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(100) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Username`, `Password`, `Date`) VALUES
(1, 'admin', 'admin', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `survey`
--
ALTER TABLE `survey`
  ADD PRIMARY KEY (`Ind`);

--
-- Indexes for table `surveyor`
--
ALTER TABLE `surveyor`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `survey`
--
ALTER TABLE `survey`
  MODIFY `Ind` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `surveyor`
--
ALTER TABLE `surveyor`
  MODIFY `ID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
