-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2024 a las 05:53:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `subcoffee`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `pk_id_ofer` int(11) NOT NULL,
  `fecha_ofer` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `oferta_ofer` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `fk_id_subasta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ofertas`
--

INSERT INTO `ofertas` (`pk_id_ofer`, `fecha_ofer`, `oferta_ofer`, `fk_id_usuario`, `fk_id_subasta`) VALUES
(73, '2024-06-10 04:24:56', 289000, 2, 36),
(74, '2024-06-10 22:56:46', 199000, 2, 30),
(75, '2024-06-11 00:00:27', 489000, 1, 36),
(76, '2024-06-11 01:40:11', 550000, 2, 31),
(77, '2024-06-11 01:40:32', 216000, 2, 37),
(78, '2024-06-12 03:47:57', 995000, 1, 38),
(79, '2024-06-12 03:48:07', 105000, 1, 39);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`pk_id_ofer`),
  ADD KEY `PostulaUser` (`fk_id_usuario`),
  ADD KEY `Postulasub` (`fk_id_subasta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `pk_id_ofer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD CONSTRAINT `PostulaUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`),
  ADD CONSTRAINT `Postulasub` FOREIGN KEY (`fk_id_subasta`) REFERENCES `subasta` (`pk_id_sub`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
