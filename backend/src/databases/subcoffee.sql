-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2024 a las 21:49:29
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
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `pk_id_chat` int(11) NOT NULL,
  `mensaje_chat` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `imagen_chat` varchar(255) NOT NULL,
  `fecha_chat` timestamp NOT NULL DEFAULT current_timestamp(),
  `fk_id_subasta` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `pk_codigo_depar` int(11) NOT NULL,
  `nombre_depart` varchar(255) NOT NULL,
  `estado_depar` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`pk_codigo_depar`, `nombre_depart`, `estado_depar`) VALUES
(5, 'Antioquia', 'activo'),
(8, 'Atlántico', 'activo'),
(11, 'Bogotá, D.C. (Distrito Capital)', 'activo'),
(13, 'Bolívar', 'activo'),
(15, 'Boyacá', 'activo'),
(17, 'Caldas', 'activo'),
(18, 'Caquetá', 'activo'),
(19, 'Cauca', 'activo'),
(20, 'Cesar', 'activo'),
(23, 'Córdoba', 'activo'),
(25, 'Cundinamarca', 'activo'),
(27, 'Chocó', 'activo'),
(41, 'Huila', 'activo'),
(44, 'La Guajira', 'activo'),
(47, 'Magdalena', 'activo'),
(50, 'Meta', 'activo'),
(52, 'Nariño', 'activo'),
(54, 'Norte de Santander', 'activo'),
(63, 'Quindío', 'activo'),
(66, 'Risaralda', 'activo'),
(68, 'Santander', 'activo'),
(70, 'Sucre', 'activo'),
(73, 'Tolima', 'activo'),
(76, 'Valle del Cauca', 'activo'),
(81, 'Arauca', 'activo'),
(85, 'Casanare', 'activo'),
(86, 'Putumayo', 'activo'),
(88, 'San Andrés y Providencia', 'activo'),
(91, 'Amazonas', 'activo'),
(94, 'Guainía', 'activo'),
(95, 'Guaviare', 'activo'),
(97, 'Vaupés', 'activo'),
(99, 'Vichada', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `finca`
--

CREATE TABLE `finca` (
  `pk_id_fin` int(11) NOT NULL,
  `nombre_fin` varchar(50) NOT NULL,
  `longitud_fin` varchar(40) NOT NULL,
  `latitud_fin` varchar(40) NOT NULL,
  `imagen_fin` varchar(100) NOT NULL,
  `descripcion_fin` varchar(100) DEFAULT NULL,
  `estado_fin` enum('activo','inactivo') DEFAULT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `fk_vereda` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `pk_codigo_muni` bigint(20) NOT NULL,
  `nombre_muni` varchar(255) NOT NULL,
  `estado_muni` enum('activo','inactivo') NOT NULL,
  `fk_departamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`pk_codigo_muni`, `nombre_muni`, `estado_muni`, `fk_departamento`) VALUES
(41001, 'Neiva', 'activo', 41),
(41006, 'Acevedo', 'activo', 41),
(41013, 'Aipe', 'activo', 41),
(41016, 'Algeciras', 'activo', 41),
(41020, 'Altamira', 'activo', 41),
(41026, 'Baraya', 'activo', 41),
(41078, 'Campoalegre', 'activo', 41),
(41132, 'Colombia', 'activo', 41),
(41206, 'Elías', 'activo', 41),
(41244, 'Garzón', 'activo', 41),
(41298, 'Gigante', 'activo', 41),
(41306, 'Guadalupe', 'activo', 41),
(41319, 'Hobo', 'activo', 41),
(41349, 'Íquira', 'activo', 41),
(41357, 'Isnos', 'activo', 41),
(41359, 'La Argentina', 'activo', 41),
(41378, 'La Plata', 'activo', 41),
(41483, 'Nátaga', 'activo', 41),
(41503, 'Oporapa', 'activo', 41),
(41518, 'Paicol', 'activo', 41),
(41524, 'Palermo', 'activo', 41),
(41530, 'Palestina', 'activo', 41),
(41548, 'Pital', 'activo', 41),
(41551, 'Pitalito', 'activo', 41),
(41615, 'Rivera', 'activo', 41),
(41660, 'Saladoblanco', 'activo', 41),
(41668, 'San Agustín', 'activo', 41),
(41676, 'Santa María', 'activo', 41),
(41770, 'Suaza', 'activo', 41),
(41791, 'Tarqui', 'activo', 41),
(41797, 'Tesalia', 'activo', 41),
(41799, 'Tello', 'activo', 41),
(41801, 'Teruel', 'activo', 41),
(41807, 'Timaná', 'activo', 41),
(41872, 'Villavieja', 'activo', 41),
(41885, 'Yaguará', 'activo', 41);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `pk_id_not` int(11) NOT NULL,
  `tipo_not` enum('oferta','mensaje','cierre') NOT NULL,
  `fecha_not` timestamp NOT NULL DEFAULT current_timestamp(),
  `texto_not` varchar(150) NOT NULL,
  `fk_id_subasta` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `pk_id_pos` int(11) NOT NULL,
  `fecha_pos` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `oferta_pos` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `fk_id_subasta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulantes`
--

CREATE TABLE `postulantes` (
  `fk_id_usuario` int(11) NOT NULL,
  `fk_id_subasta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subasta`
--

CREATE TABLE `subasta` (
  `pk_id_sub` int(11) NOT NULL,
  `fecha_inicio_sub` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_fin_sub` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `imagen_sub` varchar(255) DEFAULT NULL,
  `precio_inicial_sub` int(11) NOT NULL,
  `precio_final_sub` int(11) DEFAULT NULL,
  `unidad_peso_sub` enum('Gramo','Libra','Kilogramo','Tonelada') NOT NULL,
  `cantidad` float NOT NULL,
  `estado_sub` enum('abierta','espera','cerrada') NOT NULL,
  `certificado_sub` varchar(255) DEFAULT NULL,
  `fk_variedad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `pk_cedula_user` int(11) NOT NULL,
  `nombre_user` varchar(50) NOT NULL,
  `email_user` varchar(100) NOT NULL,
  `password_user` char(60) NOT NULL,
  `descripcion_user` varchar(170) DEFAULT NULL,
  `imagen_user` varchar(255) DEFAULT NULL,
  `telefono_user` varchar(12) NOT NULL,
  `fecha_nacimiento_user` date NOT NULL,
  `rol_user` enum('vendedor','comprador','admin') NOT NULL,
  `estado_user` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`pk_cedula_user`, `nombre_user`, `email_user`, `password_user`, `descripcion_user`, `imagen_user`, `telefono_user`, `fecha_nacimiento_user`, `rol_user`, `estado_user`) VALUES
(12101220, 'Raul Realpe', 'raul@gmail.com', '$2b$12$0ylIY4w6jmSjJqDOUUAgLuPyKJT7713FQWcUXtDkFfNv.84xNLTsq', NULL, NULL, '3203294684', '1983-02-20', 'comprador', 'activo'),
(1084251889, 'Juan Realpe', 'juan@gmail.com', '$2b$12$08tE0U2.jPJ9AVRjP9ej2OSJZDL72D/nwYSKZTYZCwlCCHZxFZccW', NULL, NULL, '3157874593', '2005-06-17', 'admin', 'activo'),
(1084252915, 'Andres', 'andres@gmail.com', '$2b$12$S6SGNywU6GOsgRj6.HwIPuGqsTlKItSH8LcN8/lhCqV/.A9VgcygC', NULL, NULL, '3186452162', '2006-06-10', 'vendedor', 'activo'),
(1084253677, 'Marcella Ceron', 'marcela@gmail.com', '$2b$12$s..RHODksQ/BrXQ7.fux5.iRnFojJFskrMSeYEfzZmQuxUsUTIewm', NULL, NULL, '3114840169', '1989-03-09', 'comprador', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variedad`
--

CREATE TABLE `variedad` (
  `pk_id_vari` int(11) NOT NULL,
  `tipo_vari` enum('Tipica','Borbon','Tabi','Caturra','Variedad Colombia') NOT NULL,
  `descripcion_vari` varchar(100) DEFAULT NULL,
  `imagen_vari` varchar(100) DEFAULT NULL,
  `estado_vari` enum('activo','inactivo') NOT NULL,
  `fk_finca` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vereda`
--

CREATE TABLE `vereda` (
  `pk_id_vere` bigint(11) NOT NULL,
  `nombre_vere` varchar(255) NOT NULL,
  `fk_municipio` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`pk_id_chat`),
  ADD KEY `subastac` (`fk_id_subasta`),
  ADD KEY `chatUser` (`fk_id_usuario`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`pk_codigo_depar`);

--
-- Indices de la tabla `finca`
--
ALTER TABLE `finca`
  ADD PRIMARY KEY (`pk_id_fin`),
  ADD UNIQUE KEY `poseer` (`fk_vereda`),
  ADD KEY `fincaUser` (`fk_id_usuario`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`pk_codigo_muni`),
  ADD KEY `pertenecer` (`fk_departamento`) USING BTREE;

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`pk_id_not`),
  ADD KEY `subastaNo` (`fk_id_subasta`),
  ADD KEY `notificacionUser` (`fk_id_usuario`);

--
-- Indices de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`pk_id_pos`),
  ADD KEY `PostulaUser` (`fk_id_usuario`),
  ADD KEY `Postulasub` (`fk_id_subasta`);

--
-- Indices de la tabla `postulantes`
--
ALTER TABLE `postulantes`
  ADD UNIQUE KEY `tener` (`fk_id_usuario`),
  ADD UNIQUE KEY `quedar` (`fk_id_subasta`) USING BTREE;

--
-- Indices de la tabla `subasta`
--
ALTER TABLE `subasta`
  ADD PRIMARY KEY (`pk_id_sub`),
  ADD UNIQUE KEY `variedad` (`fk_variedad`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`pk_cedula_user`);

--
-- Indices de la tabla `variedad`
--
ALTER TABLE `variedad`
  ADD PRIMARY KEY (`pk_id_vari`),
  ADD UNIQUE KEY `finca` (`fk_finca`);

--
-- Indices de la tabla `vereda`
--
ALTER TABLE `vereda`
  ADD PRIMARY KEY (`pk_id_vere`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `pk_id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `finca`
--
ALTER TABLE `finca`
  MODIFY `pk_id_fin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `pk_id_not` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `pk_id_pos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `subasta`
--
ALTER TABLE `subasta`
  MODIFY `pk_id_sub` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `variedad`
--
ALTER TABLE `variedad`
  MODIFY `pk_id_vari` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `vereda`
--
ALTER TABLE `vereda`
  MODIFY `pk_id_vere` bigint(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chatUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`),
  ADD CONSTRAINT `subastac` FOREIGN KEY (`fk_id_subasta`) REFERENCES `subasta` (`pk_id_sub`);

--
-- Filtros para la tabla `finca`
--
ALTER TABLE `finca`
  ADD CONSTRAINT `fincaUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`),
  ADD CONSTRAINT `finca_ibfk_1` FOREIGN KEY (`fk_vereda`) REFERENCES `vereda` (`pk_id_vere`);

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`fk_departamento`) REFERENCES `departamento` (`pk_codigo_depar`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificacionUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`),
  ADD CONSTRAINT `subastaNo` FOREIGN KEY (`fk_id_subasta`) REFERENCES `subasta` (`pk_id_sub`);

--
-- Filtros para la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD CONSTRAINT `PostulaUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`),
  ADD CONSTRAINT `Postulasub` FOREIGN KEY (`fk_id_subasta`) REFERENCES `subasta` (`pk_id_sub`);

--
-- Filtros para la tabla `postulantes`
--
ALTER TABLE `postulantes`
  ADD CONSTRAINT `postulantes_ibfk_1` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`),
  ADD CONSTRAINT `postulantes_ibfk_2` FOREIGN KEY (`fk_id_subasta`) REFERENCES `subasta` (`pk_id_sub`);

--
-- Filtros para la tabla `subasta`
--
ALTER TABLE `subasta`
  ADD CONSTRAINT `subasta_ibfk_1` FOREIGN KEY (`fk_variedad`) REFERENCES `variedad` (`pk_id_vari`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `variedad`
--
ALTER TABLE `variedad`
  ADD CONSTRAINT `variedad_ibfk_1` FOREIGN KEY (`fk_finca`) REFERENCES `finca` (`pk_id_fin`);

--
-- Filtros para la tabla `vereda`
--
ALTER TABLE `vereda`
  ADD CONSTRAINT `vereda_ibfk_1` FOREIGN KEY (`pk_id_vere`) REFERENCES `municipio` (`pk_codigo_muni`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
