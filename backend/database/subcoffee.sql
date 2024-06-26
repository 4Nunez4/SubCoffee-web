-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2024 a las 01:39:48
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
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `pk_id_cali` int(11) NOT NULL,
  `id_usuario_cali` int(11) NOT NULL,
  `estrellas_cali` int(11) NOT NULL,
  `opiniones_cali` varchar(200) NOT NULL,
  `fecha_cali` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fk_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`pk_id_cali`, `id_usuario_cali`, `estrellas_cali`, `opiniones_cali`, `fecha_cali`, `fk_usuario`) VALUES
(1, 4, 4, 'Me parece que este usuario es muy serio para los negocios, lo recomiendo mucho.', '2024-06-10 02:32:46', 1),
(2, 1, 5, 'Es un buen sujeto y además es cumplido.', '2024-06-11 01:33:21', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `pk_codigo_depar` int(11) NOT NULL,
  `nombre_depar` varchar(255) NOT NULL,
  `estado_depar` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`pk_codigo_depar`, `nombre_depar`, `estado_depar`) VALUES
(5, 'Antioquia', 'activo'),
(8, 'Atlántico', 'activo'),
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
(99, 'Vichada', 'activo'),
(100, 'Prueba Departamento', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `finca`
--

CREATE TABLE `finca` (
  `pk_id_fin` int(11) NOT NULL,
  `nombre_fin` varchar(50) NOT NULL,
  `imagen_fin` varchar(100) NOT NULL,
  `estado_fin` enum('activo','inactivo') DEFAULT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `fk_vereda` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `finca`
--

INSERT INTO `finca` (`pk_id_fin`, `nombre_fin`, `imagen_fin`, `estado_fin`, `fk_id_usuario`, `fk_vereda`) VALUES
(37, 'Mi Primera finca', 'finca1.jpeg', 'activo', 1, 1),
(38, 'Mi Segunda Finca', 'finca1.jpeg', 'activo', 1, 2),
(39, 'Mi primer finca', 'WhatsApp Image 2024-06-08 at 2.44.38 PM.jpeg', 'activo', 4, 1);

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
(1, 'Prueba Municipio', 'activo', 100),
(5002, 'Abejorral', 'activo', 5),
(5004, 'Abriaquí', 'activo', 5),
(5021, 'Alejandría', 'activo', 5),
(5030, 'Amagá', 'activo', 5),
(5031, 'Amalfi', 'activo', 5),
(5034, 'Andes', 'activo', 5),
(5036, 'Angelópolis', 'activo', 5),
(5038, 'Angostura', 'activo', 5),
(5040, 'Anorí', 'activo', 5),
(5042, 'Anza', 'activo', 5),
(5044, 'Apartadó', 'activo', 5),
(5045, 'Arboletes', 'activo', 5),
(5051, 'Argelia', 'activo', 5),
(5055, 'Armenia', 'activo', 5),
(5059, 'Barbosa', 'activo', 5),
(5079, 'Bello', 'activo', 5),
(5086, 'Belmira', 'activo', 5),
(5088, 'Betania', 'activo', 5),
(5091, 'Betulia', 'activo', 5),
(5101, 'Briceño', 'activo', 5),
(5107, 'Buriticá', 'activo', 5),
(5113, 'Cáceres', 'activo', 5),
(5120, 'Caicedo', 'activo', 5),
(5125, 'Caldas', 'activo', 5),
(5129, 'Campamento', 'activo', 5),
(5134, 'Cañasgordas', 'activo', 5),
(5138, 'Caracolí', 'activo', 5),
(5142, 'Caramanta', 'activo', 5),
(5145, 'Carepa', 'activo', 5),
(5147, 'Carolina del Príncipe', 'activo', 5),
(5148, 'Caucasia', 'activo', 5),
(5150, 'Chigorodó', 'activo', 5),
(5154, 'Cisneros', 'activo', 5),
(5172, 'Ciudad Bolívar', 'activo', 5),
(5190, 'Cocorná', 'activo', 5),
(5197, 'Concepción', 'activo', 5),
(5206, 'Concordia', 'activo', 5),
(5209, 'Copacabana', 'activo', 5),
(5212, 'Dabeiba', 'activo', 5),
(5234, 'Donmatías', 'activo', 5),
(5237, 'Ebéjico', 'activo', 5),
(5240, 'El Bagre', 'activo', 5),
(5250, 'Entrerríos', 'activo', 5),
(5264, 'Envigado', 'activo', 5),
(5266, 'Fredonia', 'activo', 5),
(5282, 'Frontino', 'activo', 5),
(5284, 'Giraldo', 'activo', 5),
(5306, 'Girardota', 'activo', 5),
(5308, 'Gómez Plata', 'activo', 5),
(5310, 'Granada', 'activo', 5),
(5313, 'Guadalupe', 'activo', 5),
(5315, 'Guarne', 'activo', 5),
(5318, 'Guatapé', 'activo', 5),
(5321, 'Heliconia', 'activo', 5),
(5347, 'Hispania', 'activo', 5),
(5353, 'Itagüí', 'activo', 5),
(5360, 'Ituango', 'activo', 5),
(5361, 'Jardín', 'activo', 5),
(5364, 'Jericó', 'activo', 5),
(5368, 'La Ceja', 'activo', 5),
(5376, 'La Estrella', 'activo', 5),
(5380, 'La Pintada', 'activo', 5),
(5390, 'La Unión', 'activo', 5),
(5400, 'Liborina', 'activo', 5),
(5411, 'Maceo', 'activo', 5),
(5425, 'Marinilla', 'activo', 5),
(5440, 'Medellín', 'activo', 5),
(5467, 'Montebello', 'activo', 5),
(5475, 'Murindó', 'activo', 5),
(5480, 'Mutatá', 'activo', 5),
(5483, 'Nariño', 'activo', 5),
(5490, 'Nechí', 'activo', 5),
(5495, 'Necoclí', 'activo', 5),
(5501, 'Olaya', 'activo', 5),
(5541, 'Peñol', 'activo', 5),
(5543, 'Peque', 'activo', 5),
(5576, 'Pueblorrico', 'activo', 5),
(5579, 'Puerto Berrío', 'activo', 5),
(5585, 'Puerto Nare', 'activo', 5),
(5591, 'Puerto Triunfo', 'activo', 5),
(5604, 'Remedios', 'activo', 5),
(5607, 'Rionegro', 'activo', 5),
(5615, 'Sabanalarga', 'activo', 5),
(5628, 'Sabaneta', 'activo', 5),
(5631, 'Salgar', 'activo', 5),
(5642, 'San Andrés de Cuerquía', 'activo', 5),
(5647, 'San Carlos', 'activo', 5),
(5649, 'San Francisco', 'activo', 5),
(5652, 'San Jerónimo', 'activo', 5),
(5656, 'San José de la Montaña', 'activo', 5),
(5658, 'San Juan de Urabá', 'activo', 5),
(5659, 'San Luis', 'activo', 5),
(5660, 'San Pedro', 'activo', 5),
(5664, 'San Pedro de Urabá', 'activo', 5),
(5665, 'San Rafael', 'activo', 5),
(5667, 'San Roque', 'activo', 5),
(5670, 'San Vicente', 'activo', 5),
(5674, 'Santa Bárbara', 'activo', 5),
(5679, 'Santa Fe de Antioquia', 'activo', 5),
(5686, 'Santa Rosa de Osos', 'activo', 5),
(5690, 'Santo Domingo', 'activo', 5),
(5697, 'Segovia', 'activo', 5),
(5736, 'Sonsón', 'activo', 5),
(5756, 'Sopetrán', 'activo', 5),
(5761, 'Támesis', 'activo', 5),
(5789, 'Tarazá', 'activo', 5),
(5790, 'Tarso', 'activo', 5),
(5792, 'Titiribí', 'activo', 5),
(5809, 'Toledo', 'activo', 5),
(5819, 'Turbo', 'activo', 5),
(5837, 'Uramita', 'activo', 5),
(5842, 'Urrao', 'activo', 5),
(5847, 'Valdivia', 'activo', 5),
(5854, 'Valparaíso', 'activo', 5),
(5856, 'Vegachí', 'activo', 5),
(5858, 'Venecia', 'activo', 5),
(5861, 'Vigía del Fuerte', 'activo', 5),
(5873, 'Yalí', 'activo', 5),
(5885, 'Yarumal', 'activo', 5),
(5887, 'Yolombó', 'activo', 5),
(5890, 'Yondó', 'activo', 5),
(5893, 'Zaragoza', 'activo', 5),
(8001, 'Barranquilla', 'activo', 8),
(8078, 'Baranoa', 'activo', 8),
(8137, 'Campo de la Cruz', 'activo', 8),
(8141, 'Candelaria', 'activo', 8),
(8296, 'Galapa', 'activo', 8),
(8372, 'Juan de Acosta', 'activo', 8),
(8421, 'Luruaco', 'activo', 8),
(8433, 'Malambo', 'activo', 8),
(8436, 'Manatí', 'activo', 8),
(8520, 'Palmar de Varela', 'activo', 8),
(8549, 'Piojó', 'activo', 8),
(8558, 'Polonuevo', 'activo', 8),
(8560, 'Ponedera', 'activo', 8),
(8573, 'Puerto Colombia', 'activo', 8),
(8606, 'Repelón', 'activo', 8),
(8634, 'Sabanagrande', 'activo', 8),
(8638, 'Sabanalarga', 'activo', 8),
(8675, 'Santa Lucía', 'activo', 8),
(8685, 'Santo Tomás', 'activo', 8),
(8758, 'Soledad', 'activo', 8),
(8770, 'Suan', 'activo', 8),
(8832, 'Tubará', 'activo', 8),
(8849, 'Usiacurí', 'activo', 8),
(13001, 'Cartagena de Indias', 'activo', 13),
(13006, 'Achí', 'activo', 13),
(13030, 'Altos del Rosario', 'activo', 13),
(13042, 'Arenal', 'activo', 13),
(13052, 'Arjona', 'activo', 13),
(13062, 'Arroyohondo', 'activo', 13),
(13074, 'Barranco de Loba', 'activo', 13),
(13140, 'Calamar', 'activo', 13),
(13160, 'Cantagallo', 'activo', 13),
(13188, 'Cicuco', 'activo', 13),
(13212, 'Córdoba', 'activo', 13),
(13222, 'Clemencia', 'activo', 13),
(13244, 'El Carmen de Bolívar', 'activo', 13),
(13248, 'El Guamo', 'activo', 13),
(13268, 'El Peñón', 'activo', 13),
(13300, 'Hatillo de Loba', 'activo', 13),
(13430, 'Magangué', 'activo', 13),
(13433, 'Mahates', 'activo', 13),
(13440, 'Margarita', 'activo', 13),
(13442, 'María la Baja', 'activo', 13),
(13458, 'Montecristo', 'activo', 13),
(13468, 'Mompós', 'activo', 13),
(13473, 'Morales', 'activo', 13),
(13549, 'Pinillos', 'activo', 13),
(13580, 'Regidor', 'activo', 13),
(13600, 'Río Viejo', 'activo', 13),
(13620, 'San Cristóbal', 'activo', 13),
(13647, 'San Estanislao', 'activo', 13),
(13650, 'San Fernando', 'activo', 13),
(13654, 'San Jacinto', 'activo', 13),
(13655, 'San Jacinto del Cauca', 'activo', 13),
(13657, 'San Juan Nepomuceno', 'activo', 13),
(13667, 'San Martín de Loba', 'activo', 13),
(13670, 'San Pablo', 'activo', 13),
(13673, 'Santa Catalina', 'activo', 13),
(13683, 'Santa Rosa', 'activo', 13),
(13688, 'Santa Rosa del Sur', 'activo', 13),
(13744, 'Simití', 'activo', 13),
(13760, 'Soplaviento', 'activo', 13),
(13780, 'Talaigua Nuevo', 'activo', 13),
(13810, 'Tiquisio', 'activo', 13),
(13836, 'Turbaco', 'activo', 13),
(13838, 'Turbaná', 'activo', 13),
(13873, 'Villanueva', 'activo', 13),
(13894, 'Zambrano', 'activo', 13),
(15001, 'Tunja', 'activo', 15),
(15022, 'Almeida', 'activo', 15),
(15047, 'Aquitania', 'activo', 15),
(15051, 'Arcabuco', 'activo', 15),
(15087, 'Belén', 'activo', 15),
(15090, 'Berbeo', 'activo', 15),
(15092, 'Betéitiva', 'activo', 15),
(15097, 'Boavita', 'activo', 15),
(15104, 'Boyacá', 'activo', 15),
(15106, 'Briceño', 'activo', 15),
(15109, 'Buenavista', 'activo', 15),
(15114, 'Busbanzá', 'activo', 15),
(15131, 'Caldas', 'activo', 15),
(15135, 'Campohermoso', 'activo', 15),
(15162, 'Cerinza', 'activo', 15),
(15172, 'Chinavita', 'activo', 15),
(15176, 'Chiquinquirá', 'activo', 15),
(15180, 'Chíquiza', 'activo', 15),
(15183, 'Chiscas', 'activo', 15),
(15185, 'Chita', 'activo', 15),
(15187, 'Chitaraque', 'activo', 15),
(15189, 'Chivatá', 'activo', 15),
(15204, 'Ciénega', 'activo', 15),
(15212, 'Cómbita', 'activo', 15),
(15215, 'Coper', 'activo', 15),
(15218, 'Corrales', 'activo', 15),
(15223, 'Covarachía', 'activo', 15),
(15224, 'Cubará', 'activo', 15),
(15226, 'Cucaita', 'activo', 15),
(15232, 'Cuítiva', 'activo', 15),
(15236, 'Chíquiza', 'activo', 15),
(15238, 'Chita', 'activo', 15),
(15244, 'Chitaraque', 'activo', 15),
(15248, 'Chivatá', 'activo', 15),
(15272, 'Duitama', 'activo', 15),
(15276, 'El Cocuy', 'activo', 15),
(15293, 'El Espino', 'activo', 15),
(15296, 'Firavitoba', 'activo', 15),
(15299, 'Floresta', 'activo', 15),
(15317, 'Gachantivá', 'activo', 15),
(15322, 'Gameza', 'activo', 15),
(15325, 'Garagoa', 'activo', 15),
(15332, 'Guacamayas', 'activo', 15),
(15362, 'Guateque', 'activo', 15),
(15367, 'Guayatá', 'activo', 15),
(15368, 'Güicán', 'activo', 15),
(15377, 'Iza', 'activo', 15),
(15380, 'Jenesano', 'activo', 15),
(15383, 'Jericó', 'activo', 15),
(15385, 'La Capilla', 'activo', 15),
(15401, 'La Uvita', 'activo', 15),
(15403, 'La Victoria', 'activo', 15),
(15407, 'Labranzagrande', 'activo', 15),
(15425, 'Macanal', 'activo', 15),
(15442, 'Maripí', 'activo', 15),
(15455, 'Miraflores', 'activo', 15),
(15464, 'Mongua', 'activo', 15),
(15466, 'Monguí', 'activo', 15),
(15469, 'Moniquirá', 'activo', 15),
(15476, 'Motavita', 'activo', 15),
(15480, 'Muzo', 'activo', 15),
(15491, 'Nobsa', 'activo', 15),
(15494, 'Nuevo Colón', 'activo', 15),
(15500, 'Oicatá', 'activo', 15),
(15507, 'Otanche', 'activo', 15),
(15511, 'Pachavita', 'activo', 15),
(15514, 'Páez', 'activo', 15),
(15516, 'Paipa', 'activo', 15),
(15518, 'Pajarito', 'activo', 15),
(15522, 'Panqueba', 'activo', 15),
(15531, 'Pauna', 'activo', 15),
(15533, 'Paya', 'activo', 15),
(15537, 'Paz de Río', 'activo', 15),
(15542, 'Pesca', 'activo', 15),
(15550, 'Pisba', 'activo', 15),
(15572, 'Puerto Boyacá', 'activo', 15),
(15580, 'Quípama', 'activo', 15),
(15599, 'Ramiriquí', 'activo', 15),
(15600, 'Ráquira', 'activo', 15),
(15621, 'Rondón', 'activo', 15),
(15632, 'Saboyá', 'activo', 15),
(15638, 'Sáchica', 'activo', 15),
(15646, 'Samacá', 'activo', 15),
(15660, 'San Eduardo', 'activo', 15),
(15664, 'San José de Pare', 'activo', 15),
(15667, 'San Luis de Gaceno', 'activo', 15),
(15673, 'San Mateo', 'activo', 15),
(15676, 'San Miguel de Sema', 'activo', 15),
(15681, 'San Pablo de Borbur', 'activo', 15),
(15686, 'Santana', 'activo', 15),
(15690, 'Santa María', 'activo', 15),
(15693, 'Santa Rosa de Viterbo', 'activo', 15),
(15696, 'Santa Sofía', 'activo', 15),
(15720, 'Sativanorte', 'activo', 15),
(15723, 'Sativasur', 'activo', 15),
(15740, 'Siachoque', 'activo', 15),
(15753, 'Soatá', 'activo', 15),
(15755, 'Socotá', 'activo', 15),
(15757, 'Socha', 'activo', 15),
(15759, 'Sogamoso', 'activo', 15),
(15761, 'Somondoco', 'activo', 15),
(15762, 'Sora', 'activo', 15),
(15763, 'Soracá', 'activo', 15),
(15764, 'Sotaquirá', 'activo', 15),
(15774, 'Susacón', 'activo', 15),
(15776, 'Sutamarchán', 'activo', 15),
(15778, 'Sutatenza', 'activo', 15),
(15790, 'Tasco', 'activo', 15),
(15798, 'Tenza', 'activo', 15),
(15804, 'Tibaná', 'activo', 15),
(15806, 'Tibasosa', 'activo', 15),
(15808, 'Tinjacá', 'activo', 15),
(15810, 'Tipacoque', 'activo', 15),
(15814, 'Toca', 'activo', 15),
(15816, 'Togüí', 'activo', 15),
(15820, 'Tópaga', 'activo', 15),
(15822, 'Tota', 'activo', 15),
(15832, 'Tununguá', 'activo', 15),
(15835, 'Turmequé', 'activo', 15),
(15837, 'Tuta', 'activo', 15),
(15839, 'Tutazá', 'activo', 15),
(15842, 'Umbita', 'activo', 15),
(15861, 'Ventaquemada', 'activo', 15),
(15879, 'Viracachá', 'activo', 15),
(15897, 'Zetaquira', 'activo', 15),
(17001, 'Manizales', 'activo', 17),
(17013, 'Aguadas', 'activo', 17),
(17042, 'Anserma', 'activo', 17),
(17050, 'Aranzazu', 'activo', 17),
(17088, 'Belalcázar', 'activo', 17),
(17174, 'Chinchiná', 'activo', 17),
(17272, 'Filadelfia', 'activo', 17),
(17380, 'La Dorada', 'activo', 17),
(17388, 'La Merced', 'activo', 17),
(17433, 'Manzanares', 'activo', 17),
(17442, 'Marmato', 'activo', 17),
(17444, 'Marquetalia', 'activo', 17),
(17446, 'Marulanda', 'activo', 17),
(17486, 'Neira', 'activo', 17),
(17495, 'Norcasia', 'activo', 17),
(17513, 'Pácora', 'activo', 17),
(17524, 'Palestina', 'activo', 17),
(17541, 'Pensilvania', 'activo', 17),
(17614, 'Riosucio', 'activo', 17),
(17616, 'Risaralda', 'activo', 17),
(17653, 'Salamina', 'activo', 17),
(17662, 'Samaná', 'activo', 17),
(17665, 'San José', 'activo', 17),
(17777, 'Supía', 'activo', 17),
(17867, 'Victoria', 'activo', 17),
(17873, 'Villamaría', 'activo', 17),
(17877, 'Viterbo', 'activo', 17),
(18001, 'Florencia', 'activo', 18),
(18029, 'Albania', 'activo', 18),
(18094, 'Belén de los Andaquíes', 'activo', 18),
(18150, 'Cartagena del Chairá', 'activo', 18),
(18205, 'Curillo', 'activo', 18),
(18247, 'El Doncello', 'activo', 18),
(18256, 'El Paujil', 'activo', 18),
(18410, 'La Montañita', 'activo', 18),
(18460, 'Milán', 'activo', 18),
(18479, 'Morelia', 'activo', 18),
(18592, 'Puerto Rico', 'activo', 18),
(18610, 'San José del Fragua', 'activo', 18),
(18753, 'San Vicente del Caguán', 'activo', 18),
(18756, 'Solano', 'activo', 18),
(18785, 'Solita', 'activo', 18),
(18860, 'Valparaíso', 'activo', 18),
(19001, 'Popayán', 'activo', 19),
(19022, 'Almaguer', 'activo', 19),
(19050, 'Argelia', 'activo', 19),
(19075, 'Balboa', 'activo', 19),
(19100, 'Bolívar', 'activo', 19),
(19110, 'Buenos Aires', 'activo', 19),
(19130, 'Cajibío', 'activo', 19),
(19137, 'Caldono', 'activo', 19),
(19142, 'Caloto', 'activo', 19),
(19212, 'Corinto', 'activo', 19),
(19256, 'El Tambo', 'activo', 19),
(19290, 'Florencia', 'activo', 19),
(19300, 'Guachené', 'activo', 19),
(19318, 'Guapi', 'activo', 19),
(19355, 'Inzá', 'activo', 19),
(19364, 'Jambaló', 'activo', 19),
(19392, 'La Sierra', 'activo', 19),
(19397, 'La Vega', 'activo', 19),
(19418, 'López', 'activo', 19),
(19450, 'Mercaderes', 'activo', 19),
(19455, 'Miranda', 'activo', 19),
(19473, 'Morales', 'activo', 19),
(19513, 'Padilla', 'activo', 19),
(19517, 'Páez', 'activo', 19),
(19532, 'Patía', 'activo', 19),
(19533, 'Piamonte', 'activo', 19),
(19548, 'Piendamó', 'activo', 19),
(19573, 'Puerto Tejada', 'activo', 19),
(19585, 'Puracé', 'activo', 19),
(19622, 'Rosas', 'activo', 19),
(19693, 'San Sebastián', 'activo', 19),
(19698, 'Santander de Quilichao', 'activo', 19),
(19701, 'Santa Rosa', 'activo', 19),
(19743, 'Silvia', 'activo', 19),
(19760, 'Sotara', 'activo', 19),
(19780, 'Suárez', 'activo', 19),
(19785, 'Sucre', 'activo', 19),
(19807, 'Timbío', 'activo', 19),
(19809, 'Timbiquí', 'activo', 19),
(19821, 'Toribio', 'activo', 19),
(19824, 'Totoró', 'activo', 19),
(19845, 'Villa Rica', 'activo', 19),
(20001, 'Valledupar', 'activo', 20),
(20011, 'Aguachica', 'activo', 20),
(20013, 'Agustín Codazzi', 'activo', 20),
(20032, 'Astrea', 'activo', 20),
(20045, 'Becerril', 'activo', 20),
(20060, 'Bosconia', 'activo', 20),
(20175, 'Chimichagua', 'activo', 20),
(20178, 'Chiriguaná', 'activo', 20),
(20228, 'Curumaní', 'activo', 20),
(20238, 'El Copey', 'activo', 20),
(20250, 'El Paso', 'activo', 20),
(20295, 'Gamarra', 'activo', 20),
(20310, 'González', 'activo', 20),
(20383, 'La Gloria', 'activo', 20),
(20400, 'La Jagua de Ibirico', 'activo', 20),
(20443, 'La Paz', 'activo', 20),
(20517, 'Pailitas', 'activo', 20),
(20550, 'Pelaya', 'activo', 20),
(20570, 'Pueblo Bello', 'activo', 20),
(20614, 'Manaure Balcón del Cesar', 'activo', 20),
(20621, 'Río de Oro', 'activo', 20),
(20710, 'San Alberto', 'activo', 20),
(20750, 'San Diego', 'activo', 20),
(20770, 'San Martín', 'activo', 20),
(20787, 'Tamalameque', 'activo', 20),
(23001, 'Montería', 'activo', 23),
(23068, 'Ayapel', 'activo', 23),
(23079, 'Buenavista', 'activo', 23),
(23090, 'Canalete', 'activo', 23),
(23162, 'Cereté', 'activo', 23),
(23168, 'Chimá', 'activo', 23),
(23182, 'Chinú', 'activo', 23),
(23189, 'Ciénaga de Oro', 'activo', 23),
(23300, 'Cotorra', 'activo', 23),
(23350, 'La Apartada', 'activo', 23),
(23417, 'Lorica', 'activo', 23),
(23419, 'Los Córdobas', 'activo', 23),
(23464, 'Momil', 'activo', 23),
(23466, 'Montelíbano', 'activo', 23),
(23500, 'Moñitos', 'activo', 23),
(23555, 'Planeta Rica', 'activo', 23),
(23570, 'Pueblo Nuevo', 'activo', 23),
(23574, 'Puerto Escondido', 'activo', 23),
(23580, 'Puerto Libertador', 'activo', 23),
(23586, 'Purísima', 'activo', 23),
(23660, 'Sahagún', 'activo', 23),
(23670, 'San Andrés de Sotavento', 'activo', 23),
(23672, 'San Antero', 'activo', 23),
(23675, 'San Bernardo del Viento', 'activo', 23),
(23678, 'San Carlos', 'activo', 23),
(23686, 'San José de Uré', 'activo', 23),
(23688, 'San Pelayo', 'activo', 23),
(23807, 'Tierralta', 'activo', 23),
(23855, 'Valencia', 'activo', 23),
(25001, 'Bogotá, D.C.', 'activo', 25),
(25019, 'Agua de Dios', 'activo', 25),
(25035, 'Albán', 'activo', 25),
(25040, 'Anapoima', 'activo', 25),
(25053, 'Anolaima', 'activo', 25),
(25086, 'Arbeláez', 'activo', 25),
(25095, 'Beltrán', 'activo', 25),
(25099, 'Bituima', 'activo', 25),
(25120, 'Bojacá', 'activo', 25),
(25123, 'Cabrera', 'activo', 25),
(25126, 'Cachipay', 'activo', 25),
(25148, 'Cajicá', 'activo', 25),
(25151, 'Caparrapí', 'activo', 25),
(25154, 'Cáqueza', 'activo', 25),
(25168, 'Carmen de Carupa', 'activo', 25),
(25175, 'Chaguaní', 'activo', 25),
(25178, 'Chía', 'activo', 25),
(25181, 'Chipaque', 'activo', 25),
(25183, 'Choachí', 'activo', 25),
(25185, 'Chocontá', 'activo', 25),
(25188, 'Cogua', 'activo', 25),
(25191, 'Cota', 'activo', 25),
(25200, 'Cucunubá', 'activo', 25),
(25214, 'El Colegio', 'activo', 25),
(25224, 'El Peñón', 'activo', 25),
(25245, 'El Rosal', 'activo', 25),
(25258, 'Facatativá', 'activo', 25),
(25260, 'Fomeque', 'activo', 25),
(25269, 'Fosca', 'activo', 25),
(25279, 'Funza', 'activo', 25),
(25281, 'Fúquene', 'activo', 25),
(25286, 'Fusagasugá', 'activo', 25),
(25288, 'Gachalá', 'activo', 25),
(25290, 'Gachancipá', 'activo', 25),
(25293, 'Gachetá', 'activo', 25),
(25295, 'Gama', 'activo', 25),
(25297, 'Girardot', 'activo', 25),
(25299, 'Granada', 'activo', 25),
(25307, 'Guachetá', 'activo', 25),
(25312, 'Guaduas', 'activo', 25),
(25317, 'Guasca', 'activo', 25),
(25320, 'Guataquí', 'activo', 25),
(25322, 'Guatavita', 'activo', 25),
(25324, 'Guayabal de Síquima', 'activo', 25),
(25326, 'Guayabetal', 'activo', 25),
(25328, 'Gutiérrez', 'activo', 25),
(25335, 'Jerusalén', 'activo', 25),
(25339, 'Junín', 'activo', 25),
(25368, 'La Calera', 'activo', 25),
(25372, 'La Mesa', 'activo', 25),
(25377, 'La Palma', 'activo', 25),
(25386, 'La Peña', 'activo', 25),
(25394, 'La Vega', 'activo', 25),
(25398, 'Lenguazaque', 'activo', 25),
(25402, 'Machetá', 'activo', 25),
(25407, 'Madrid', 'activo', 25),
(25426, 'Manta', 'activo', 25),
(25430, 'Medina', 'activo', 25),
(25436, 'Mosquera', 'activo', 25),
(25438, 'Nariño', 'activo', 25),
(25473, 'Nemocón', 'activo', 25),
(25483, 'Nilo', 'activo', 25),
(25486, 'Nimaima', 'activo', 25),
(25488, 'Nocaima', 'activo', 25),
(25489, 'Venecia', 'activo', 25),
(25491, 'Pacho', 'activo', 25),
(25506, 'Paime', 'activo', 25),
(25513, 'Pandi', 'activo', 25),
(25518, 'Paratebueno', 'activo', 25),
(25524, 'Pasca', 'activo', 25),
(25530, 'Puerto Salgar', 'activo', 25),
(25535, 'Pulí', 'activo', 25),
(25572, 'Quebradanegra', 'activo', 25),
(25580, 'Quetame', 'activo', 25),
(25592, 'Quipile', 'activo', 25),
(25594, 'Apulo', 'activo', 25),
(25596, 'Ricaurte', 'activo', 25),
(25612, 'San Antonio del Tequendama', 'activo', 25),
(25645, 'San Bernardo', 'activo', 25),
(25649, 'San Cayetano', 'activo', 25),
(25653, 'San Francisco', 'activo', 25),
(25658, 'San Juan de Río Seco', 'activo', 25),
(25662, 'Sasaima', 'activo', 25),
(25718, 'Sesquilé', 'activo', 25),
(25736, 'Sibaté', 'activo', 25),
(25740, 'Silvania', 'activo', 25),
(25743, 'Simijaca', 'activo', 25),
(25745, 'Soacha', 'activo', 25),
(25754, 'Sopó', 'activo', 25),
(25758, 'Subachoque', 'activo', 25),
(25769, 'Suesca', 'activo', 25),
(25772, 'Supatá', 'activo', 25),
(25777, 'Susa', 'activo', 25),
(25779, 'Sutatausa', 'activo', 25),
(25781, 'Tabio', 'activo', 25),
(25785, 'Tausa', 'activo', 25),
(25793, 'Tena', 'activo', 25),
(25797, 'Tenjo', 'activo', 25),
(25799, 'Tibacuy', 'activo', 25),
(25805, 'Tibirita', 'activo', 25),
(25807, 'Tocaima', 'activo', 25),
(25815, 'Tocancipá', 'activo', 25),
(25817, 'Topaipí', 'activo', 25),
(25823, 'Ubalá', 'activo', 25),
(25839, 'Ubaque', 'activo', 25),
(25841, 'Villa de San Diego de Ubate', 'activo', 25),
(25843, 'Une', 'activo', 25),
(25845, 'Útica', 'activo', 25),
(25851, 'Vergara', 'activo', 25),
(25862, 'Vianí', 'activo', 25),
(25867, 'Villagómez', 'activo', 25),
(25871, 'Villapinzón', 'activo', 25),
(25873, 'Villeta', 'activo', 25),
(25875, 'Viotá', 'activo', 25),
(25878, 'Vuelta Larga', 'activo', 25),
(25885, 'Yacopí', 'activo', 25),
(25898, 'Zipacón', 'activo', 25),
(25899, 'Zipaquirá', 'activo', 25),
(27001, 'Quibdó', 'activo', 27),
(27006, 'Acandí', 'activo', 27),
(27025, 'Alto Baudo', 'activo', 27),
(27050, 'Atrato', 'activo', 27),
(27073, 'Bagadó', 'activo', 27),
(27075, 'Bahía Solano', 'activo', 27),
(27077, 'Bajo Baudó', 'activo', 27),
(27086, 'Bojaya', 'activo', 27),
(27099, 'El Cantón del San Pablo', 'activo', 27),
(27135, 'Carmen del Darien', 'activo', 27),
(27150, 'Cértegui', 'activo', 27),
(27160, 'Condoto', 'activo', 27),
(27205, 'El Carmen de Atrato', 'activo', 27),
(27245, 'Istmina', 'activo', 27),
(27250, 'Juradó', 'activo', 27),
(27361, 'Lloró', 'activo', 27),
(27372, 'Medio Atrato', 'activo', 27),
(27413, 'Medio Baudó', 'activo', 27),
(27425, 'Medio San Juan', 'activo', 27),
(27430, 'Nóvita', 'activo', 27),
(27450, 'Nuquí', 'activo', 27),
(27491, 'Río Iro', 'activo', 27),
(27495, 'Río Quito', 'activo', 27),
(27580, 'Riosucio', 'activo', 27),
(27600, 'San José del Palmar', 'activo', 27),
(27615, 'Sipí', 'activo', 27),
(27660, 'Tadó', 'activo', 27),
(27745, 'Unguía', 'activo', 27),
(27787, 'Union Panamericana', 'activo', 27),
(41001, 'Neiva', 'inactivo', 41),
(41006, 'Acevedo', 'activo', 41),
(41013, 'Aipe', 'activo', 41),
(41016, 'Algeciras', 'activo', 41),
(41020, 'Altamira', 'activo', 41),
(41026, 'Baraya', 'activo', 41),
(41078, 'Campoalegre', 'activo', 41),
(41132, 'Colombia', 'activo', 41),
(41206, 'Elías', 'activo', 41),
(41244, 'Garzón', 'inactivo', 41),
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
(41885, 'Yaguará', 'activo', 41),
(44001, 'Riohacha', 'activo', 44),
(44035, 'Albania', 'activo', 44),
(44078, 'Barrancas', 'activo', 44),
(44090, 'Dibulla', 'activo', 44),
(44098, 'Distracción', 'activo', 44),
(44110, 'El Molino', 'activo', 44),
(44279, 'Fonseca', 'activo', 44),
(44378, 'Hatonuevo', 'activo', 44),
(44420, 'La Jagua del Pilar', 'activo', 44),
(44430, 'Maicao', 'activo', 44),
(44560, 'Manaure', 'activo', 44),
(44650, 'San Juan del Cesar', 'activo', 44),
(44847, 'Uribia', 'activo', 44),
(44855, 'Urumita', 'activo', 44),
(44874, 'Villanueva', 'activo', 44),
(47001, 'Santa Marta', 'activo', 47),
(47030, 'Algarrobo', 'activo', 47),
(47053, 'Aracataca', 'activo', 47),
(47058, 'Ariguaní', 'activo', 47),
(47161, 'Cerro San Antonio', 'activo', 47),
(47170, 'Chibolo', 'activo', 47),
(47189, 'Ciénaga', 'activo', 47),
(47205, 'Concordia', 'activo', 47),
(47245, 'El Banco', 'activo', 47),
(47258, 'El Piñón', 'activo', 47),
(47268, 'El Retén', 'activo', 47),
(47288, 'Fundación', 'activo', 47),
(47318, 'Guamal', 'activo', 47),
(47460, 'Nueva Granada', 'activo', 47),
(47541, 'Pedraza', 'activo', 47),
(47545, 'Pijiño del Carmen', 'activo', 47),
(47551, 'Pivijay', 'activo', 47),
(47555, 'Plato', 'activo', 47),
(47570, 'Puebloviejo', 'activo', 47),
(47605, 'Remolino', 'activo', 47),
(47660, 'Sabanas de San Ángel', 'activo', 47),
(47675, 'Salamina', 'activo', 47),
(47692, 'San Sebastián de Buenavista', 'activo', 47),
(47703, 'San Zenón', 'activo', 47),
(47707, 'Santa Ana', 'activo', 47),
(47720, 'Santa Bárbara de Pinto', 'activo', 47),
(47745, 'Sitionuevo', 'activo', 47),
(47798, 'Tenerife', 'activo', 47),
(47960, 'Zapayán', 'activo', 47),
(47980, 'Zona Bananera', 'activo', 47),
(50001, 'Villavicencio', 'activo', 50),
(50006, 'Acacías', 'activo', 50),
(50110, 'Barranca de Upía', 'activo', 50),
(50124, 'Cabuyaro', 'activo', 50),
(50150, 'Castilla la Nueva', 'activo', 50),
(50223, 'Cubarral', 'activo', 50),
(50226, 'Cumaral', 'activo', 50),
(50245, 'El Calvario', 'activo', 50),
(50251, 'El Castillo', 'activo', 50),
(50270, 'El Dorado', 'activo', 50),
(50287, 'Fuente de Oro', 'activo', 50),
(50313, 'Granada', 'activo', 50),
(50318, 'Guamal', 'activo', 50),
(50325, 'Mapiripán', 'activo', 50),
(50330, 'Mesetas', 'activo', 50),
(50350, 'La Macarena', 'activo', 50),
(50370, 'Uribe', 'activo', 50),
(50400, 'Lejanías', 'activo', 50),
(50450, 'Puerto Concordia', 'activo', 50),
(50568, 'Puerto Gaitán', 'activo', 50),
(50573, 'Puerto López', 'activo', 50),
(50577, 'Puerto Lleras', 'activo', 50),
(50590, 'Puerto Rico', 'activo', 50),
(50606, 'Restrepo', 'activo', 50),
(50680, 'San Carlos de Guaroa', 'activo', 50),
(50683, 'San Juan de Arama', 'activo', 50),
(50686, 'San Juanito', 'activo', 50),
(50689, 'San Martín', 'activo', 50),
(50711, 'Vistahermosa', 'activo', 50),
(52001, 'Pasto', 'activo', 52),
(52019, 'Albán', 'activo', 52),
(52022, 'Aldana', 'activo', 52),
(52036, 'Ancuyá', 'activo', 52),
(52051, 'Arboleda', 'activo', 52),
(52079, 'Barbacoas', 'activo', 52),
(52083, 'Belén', 'activo', 52),
(52110, 'Buesaco', 'activo', 52),
(52203, 'Colón', 'activo', 52),
(52207, 'Consacá', 'activo', 52),
(52210, 'Contadero', 'activo', 52),
(52215, 'Córdoba', 'activo', 52),
(52224, 'Cuaspud', 'activo', 52),
(52227, 'Cumbal', 'activo', 52),
(52233, 'Cumbitara', 'activo', 52),
(52240, 'Chachagüí', 'activo', 52),
(52250, 'El Charco', 'activo', 52),
(52254, 'El Peñol', 'activo', 52),
(52256, 'El Rosario', 'activo', 52),
(52258, 'El Tablón de Gómez', 'activo', 52),
(52260, 'El Tambo', 'activo', 52),
(52287, 'Funes', 'activo', 52),
(52317, 'Guachucal', 'activo', 52),
(52320, 'Guaitarilla', 'activo', 52),
(52323, 'Gualmatán', 'activo', 52),
(52352, 'Iles', 'activo', 52),
(52354, 'Imués', 'activo', 52),
(52356, 'Ipiales', 'activo', 52),
(52378, 'La Cruz', 'activo', 52),
(52381, 'La Florida', 'activo', 52),
(52385, 'La Llanada', 'activo', 52),
(52390, 'La Tola', 'activo', 52),
(52399, 'La Unión', 'activo', 52),
(52405, 'Leiva', 'activo', 52),
(52411, 'Linares', 'activo', 52),
(52418, 'Los Andes', 'activo', 52),
(52427, 'Magüí Payán', 'activo', 52),
(52435, 'Mallama', 'activo', 52),
(52473, 'Mosquera', 'activo', 52),
(52480, 'Nariño', 'activo', 52),
(52490, 'Olaya Herrera', 'activo', 52),
(52506, 'Ospina', 'activo', 52),
(52520, 'Francisco Pizarro', 'activo', 52),
(52540, 'Policarpa', 'activo', 52),
(52560, 'Potosí', 'activo', 52),
(52565, 'Providencia', 'activo', 52),
(52573, 'Puerres', 'activo', 52),
(52585, 'Pupiales', 'activo', 52),
(52612, 'Ricaurte', 'activo', 52),
(52621, 'Roberto Payán', 'activo', 52),
(52678, 'Samaniego', 'activo', 52),
(52683, 'Sandoná', 'activo', 52),
(52685, 'San Bernardo', 'activo', 52),
(52687, 'San Lorenzo', 'activo', 52),
(52693, 'San Pablo', 'activo', 52),
(52694, 'San Pedro de Cartago', 'activo', 52),
(52696, 'Santa Bárbara', 'activo', 52),
(52699, 'Santacruz', 'activo', 52),
(52720, 'Sapuyes', 'activo', 52),
(52786, 'Taminango', 'activo', 52),
(52788, 'Tangua', 'activo', 52),
(52835, 'San Andrés de Tumaco', 'activo', 52),
(52838, 'Túquerres', 'activo', 52),
(52885, 'Yacuanquer', 'activo', 52),
(54001, 'Cúcuta', 'activo', 54),
(54003, 'Abrego', 'activo', 54),
(54051, 'Arboledas', 'activo', 54),
(54099, 'Bochalema', 'activo', 54),
(54109, 'Bucarasica', 'activo', 54),
(54125, 'Cácota', 'activo', 54),
(54128, 'Cachirá', 'activo', 54),
(54172, 'Chinácota', 'activo', 54),
(54174, 'Chitagá', 'activo', 54),
(54206, 'Convención', 'activo', 54),
(54223, 'Cucutilla', 'activo', 54),
(54239, 'Durania', 'activo', 54),
(54245, 'El Carmen', 'activo', 54),
(54250, 'El Tarra', 'activo', 54),
(54261, 'El Zulia', 'activo', 54),
(54313, 'Gramalote', 'activo', 54),
(54344, 'Hacarí', 'activo', 54),
(54347, 'Herrán', 'activo', 54),
(54377, 'Labateca', 'activo', 54),
(54385, 'La Esperanza', 'activo', 54),
(54398, 'La Playa', 'activo', 54),
(54405, 'Los Patios', 'activo', 54),
(54418, 'Lourdes', 'activo', 54),
(54480, 'Mutiscua', 'activo', 54),
(54498, 'Ocaña', 'activo', 54),
(54518, 'Pamplona', 'activo', 54),
(54520, 'Pamplonita', 'activo', 54),
(54553, 'Puerto Santander', 'activo', 54),
(54599, 'Ragonvalia', 'activo', 54),
(54660, 'Salazar', 'activo', 54),
(54670, 'San Calixto', 'activo', 54),
(54673, 'San Cayetano', 'activo', 54),
(54680, 'Santiago', 'activo', 54),
(54720, 'Sardinata', 'activo', 54),
(54743, 'Silos', 'activo', 54),
(54800, 'Teorama', 'activo', 54),
(54810, 'Tibú', 'activo', 54),
(54820, 'Toledo', 'activo', 54),
(54871, 'Villa Caro', 'activo', 54),
(54874, 'Villa del Rosario', 'activo', 54),
(63001, 'Armenia', 'activo', 63),
(63111, 'Buenavista', 'activo', 63),
(63130, 'Calarcá', 'activo', 63),
(63190, 'Circasia', 'activo', 63),
(63212, 'Córdoba', 'activo', 63),
(63272, 'Filandia', 'activo', 63),
(63302, 'Génova', 'activo', 63),
(63401, 'La Tebaida', 'activo', 63),
(63470, 'Montenegro', 'activo', 63),
(63548, 'Pijao', 'activo', 63),
(63594, 'Quimbaya', 'activo', 63),
(63690, 'Salento', 'activo', 63),
(66001, 'Pereira', 'activo', 66),
(66045, 'Apía', 'activo', 66),
(66075, 'Balboa', 'activo', 66),
(66088, 'Belén de Umbría', 'activo', 66),
(66170, 'Dosquebradas', 'activo', 66),
(66318, 'Guática', 'activo', 66),
(66383, 'La Celia', 'activo', 66),
(66400, 'La Virginia', 'activo', 66),
(66440, 'Marsella', 'activo', 66),
(66456, 'Mistrató', 'activo', 66),
(66572, 'Pueblo Rico', 'activo', 66),
(66594, 'Quinchía', 'activo', 66),
(66682, 'Santa Rosa de Cabal', 'activo', 66),
(66687, 'Santuario', 'activo', 66),
(68001, 'Bucaramanga', 'activo', 68),
(68013, 'Aguada', 'activo', 68),
(68020, 'Albania', 'activo', 68),
(68051, 'Aratoca', 'activo', 68),
(68077, 'Barbosa', 'activo', 68),
(68079, 'Barichara', 'activo', 68),
(68081, 'Barrancabermeja', 'activo', 68),
(68092, 'Betulia', 'activo', 68),
(68101, 'Bolívar', 'activo', 68),
(68121, 'Cabrera', 'activo', 68),
(68132, 'California', 'activo', 68),
(68147, 'Capitanejo', 'activo', 68),
(68152, 'Carcasí', 'activo', 68),
(68160, 'Cepitá', 'activo', 68),
(68162, 'Cerrito', 'activo', 68),
(68167, 'Charalá', 'activo', 68),
(68169, 'Charta', 'activo', 68),
(68176, 'Chima', 'activo', 68),
(68179, 'Chipatá', 'activo', 68),
(68190, 'Cimitarra', 'activo', 68),
(68207, 'Concepción', 'activo', 68),
(68209, 'Confines', 'activo', 68),
(68211, 'Contratación', 'activo', 68),
(68217, 'Coromoro', 'activo', 68),
(68229, 'Curití', 'activo', 68),
(68235, 'El Carmen de Chucurí', 'activo', 68),
(68245, 'El Guacamayo', 'activo', 68),
(68250, 'El Peñón', 'activo', 68),
(68255, 'El Playón', 'activo', 68),
(68264, 'Encino', 'activo', 68),
(68266, 'Enciso', 'activo', 68),
(68271, 'Florián', 'activo', 68),
(68276, 'Floridablanca', 'activo', 68),
(68296, 'Galan', 'activo', 68),
(68298, 'Gambita', 'activo', 68),
(68307, 'Girón', 'activo', 68),
(68318, 'Guaca', 'activo', 68),
(68320, 'Guadalupe', 'activo', 68),
(68322, 'Guapota', 'activo', 68),
(68324, 'Guavatá', 'activo', 68),
(68327, 'Güepsa', 'activo', 68),
(68344, 'Hato', 'activo', 68),
(68368, 'Jesús María', 'activo', 68),
(68370, 'Jordán', 'activo', 68),
(68377, 'La Belleza', 'activo', 68),
(68385, 'Landázuri', 'activo', 68),
(68397, 'La Paz', 'activo', 68),
(68406, 'Lebríja', 'activo', 68),
(68418, 'Los Santos', 'activo', 68),
(68425, 'Macaravita', 'activo', 68),
(68432, 'Málaga', 'activo', 68),
(68444, 'Matanza', 'activo', 68),
(68464, 'Mogotes', 'activo', 68),
(68468, 'Molagavita', 'activo', 68),
(68498, 'Ocamonte', 'activo', 68),
(68500, 'Oiba', 'activo', 68),
(68502, 'Onzaga', 'activo', 68),
(68522, 'Palmar', 'activo', 68),
(68524, 'Palmas del Socorro', 'activo', 68),
(68533, 'Páramo', 'activo', 68),
(68547, 'Piedecuesta', 'activo', 68),
(68549, 'Pinchote', 'activo', 68),
(68572, 'Puente Nacional', 'activo', 68),
(68573, 'Puerto Parra', 'activo', 68),
(68575, 'Puerto Wilches', 'activo', 68),
(68615, 'Rionegro', 'activo', 68),
(68655, 'Sabana de Torres', 'activo', 68),
(68669, 'San Andrés', 'activo', 68),
(68673, 'San Benito', 'activo', 68),
(68679, 'San Gil', 'activo', 68),
(68682, 'San Joaquín', 'activo', 68),
(68684, 'San José de Miranda', 'activo', 68),
(68686, 'San Miguel', 'activo', 68),
(68689, 'San Vicente de Chucurí', 'activo', 68),
(68705, 'Santa Bárbara', 'activo', 68),
(68720, 'Santa Helena del Opón', 'activo', 68),
(68745, 'Simacota', 'activo', 68),
(68755, 'Socorro', 'activo', 68),
(68770, 'Suaita', 'activo', 68),
(68773, 'Sucre', 'activo', 68),
(68780, 'Suratá', 'activo', 68),
(68820, 'Tona', 'activo', 68),
(68855, 'Valle de San José', 'activo', 68),
(68861, 'Vélez', 'activo', 68),
(68867, 'Vetas', 'activo', 68),
(68872, 'Villanueva', 'activo', 68),
(68895, 'Zapatoca', 'activo', 68),
(70001, 'Sincelejo', 'activo', 70),
(70110, 'Buenavista', 'activo', 70),
(70124, 'Caimito', 'activo', 70),
(70204, 'Coloso', 'activo', 70),
(70215, 'Corozal', 'activo', 70),
(70221, 'Coveñas', 'activo', 70),
(70230, 'Chalán', 'activo', 70),
(70233, 'El Roble', 'activo', 70),
(70235, 'Galeras', 'activo', 70),
(70265, 'Guaranda', 'activo', 70),
(70400, 'La Unión', 'activo', 70),
(70418, 'Los Palmitos', 'activo', 70),
(70429, 'Majagual', 'activo', 70),
(70473, 'Morroa', 'activo', 70),
(70508, 'Ovejas', 'activo', 70),
(70523, 'Palmito', 'activo', 70),
(70670, 'Sampués', 'activo', 70),
(70678, 'San Benito Abad', 'activo', 70),
(70702, 'San Juan de Betulia', 'activo', 70),
(70708, 'San Marcos', 'activo', 70),
(70713, 'San Onofre', 'activo', 70),
(70717, 'San Pedro', 'activo', 70),
(70742, 'San Luis de Sincé', 'activo', 70),
(70771, 'Sucre', 'activo', 70),
(70820, 'Santiago de Tolú', 'activo', 70),
(70823, 'Tolú Viejo', 'activo', 70),
(73001, 'Ibagué', 'activo', 73),
(73024, 'Alpujarra', 'activo', 73),
(73026, 'Alvarado', 'activo', 73),
(73030, 'Ambalema', 'activo', 73),
(73043, 'Anzoátegui', 'activo', 73),
(73055, 'Armero', 'activo', 73),
(73067, 'Ataco', 'activo', 73),
(73124, 'Cajamarca', 'activo', 73),
(73148, 'Carmen de Apicalá', 'activo', 73),
(73152, 'Casabianca', 'activo', 73),
(73168, 'Chaparral', 'activo', 73),
(73200, 'Coello', 'activo', 73),
(73217, 'Coyaima', 'activo', 73),
(73226, 'Cunday', 'activo', 73),
(73236, 'Dolores', 'activo', 73),
(73268, 'Espinal', 'activo', 73),
(73270, 'Falan', 'activo', 73),
(73275, 'Flandes', 'activo', 73),
(73283, 'Fresno', 'activo', 73),
(73319, 'Guamo', 'activo', 73),
(73347, 'Herveo', 'activo', 73),
(73349, 'Honda', 'activo', 73),
(73352, 'Icononzo', 'activo', 73),
(73408, 'Lérida', 'activo', 73),
(73411, 'Líbano', 'activo', 73),
(73443, 'Mariquita', 'activo', 73),
(73449, 'Melgar', 'activo', 73),
(73461, 'Murillo', 'activo', 73),
(73483, 'Natagaima', 'activo', 73),
(73504, 'Ortega', 'activo', 73),
(73520, 'Palocabildo', 'activo', 73),
(73547, 'Piedras', 'activo', 73),
(73555, 'Planadas', 'activo', 73),
(73563, 'Prado', 'activo', 73),
(73585, 'Purificación', 'activo', 73),
(73616, 'Rioblanco', 'activo', 73),
(73622, 'Roncesvalles', 'activo', 73),
(73624, 'Rovira', 'activo', 73),
(73671, 'Saldaña', 'activo', 73),
(73675, 'San Antonio', 'activo', 73),
(73678, 'San Luis', 'activo', 73),
(73686, 'Santa Isabel', 'activo', 73),
(73770, 'Suárez', 'activo', 73),
(73854, 'Valle de San Juan', 'activo', 73),
(73861, 'Venadillo', 'activo', 73),
(73870, 'Villahermosa', 'activo', 73),
(73873, 'Villarrica', 'activo', 73),
(76001, 'Cali', 'activo', 76),
(76020, 'Alcalá', 'activo', 76),
(76036, 'Andalucía', 'activo', 76),
(76041, 'Ansermanuevo', 'activo', 76),
(76054, 'Argelia', 'activo', 76),
(76100, 'Bolívar', 'activo', 76),
(76109, 'Buenaventura', 'activo', 76),
(76111, 'Guadalajara de Buga', 'activo', 76),
(76113, 'Bugalagrande', 'activo', 76),
(76122, 'Caicedonia', 'activo', 76),
(76126, 'Calima', 'activo', 76),
(76130, 'Candelaria', 'activo', 76),
(76147, 'Cartago', 'activo', 76),
(76233, 'Dagua', 'activo', 76),
(76243, 'El Águila', 'activo', 76),
(76246, 'El Cairo', 'activo', 76),
(76248, 'El Cerrito', 'activo', 76),
(76250, 'El Dovio', 'activo', 76),
(76275, 'Florida', 'activo', 76),
(76306, 'Ginebra', 'activo', 76),
(76318, 'Guacarí', 'activo', 76),
(76364, 'Jamundí', 'activo', 76),
(76377, 'La Cumbre', 'activo', 76),
(76400, 'La Unión', 'activo', 76),
(76403, 'La Victoria', 'activo', 76),
(76497, 'Obando', 'activo', 76),
(76520, 'Palmira', 'activo', 76),
(76563, 'Pradera', 'activo', 76),
(76606, 'Restrepo', 'activo', 76),
(76616, 'Riofrío', 'activo', 76),
(76622, 'Roldanillo', 'activo', 76),
(76670, 'San Pedro', 'activo', 76),
(76736, 'Sevilla', 'activo', 76),
(76823, 'Toro', 'activo', 76),
(76828, 'Trujillo', 'activo', 76),
(76834, 'Tuluá', 'activo', 76),
(76845, 'Ulloa', 'activo', 76),
(76863, 'Versalles', 'activo', 76),
(76869, 'Vijes', 'activo', 76),
(76890, 'Yotoco', 'activo', 76),
(76892, 'Yumbo', 'activo', 76),
(76895, 'Zarzal', 'activo', 76),
(81001, 'Arauca', 'activo', 81),
(81065, 'Arauquita', 'activo', 81),
(81220, 'Cravo Norte', 'activo', 81),
(81300, 'Fortul', 'activo', 81),
(81591, 'Puerto Rondón', 'activo', 81),
(81736, 'Saravena', 'activo', 81),
(81794, 'Tame', 'activo', 81),
(85001, 'Yopal', 'activo', 85),
(85010, 'Aguazul', 'activo', 85),
(85015, 'Chameza', 'activo', 85),
(85125, 'Hato Corozal', 'activo', 85),
(85136, 'La Salina', 'activo', 85),
(85139, 'Maní', 'activo', 85),
(85162, 'Monterrey', 'activo', 85),
(85225, 'Nunchía', 'activo', 85),
(85230, 'Orocué', 'activo', 85),
(85250, 'Paz de Ariporo', 'activo', 85),
(85263, 'Pore', 'activo', 85),
(85279, 'Recetor', 'activo', 85),
(85300, 'Sabanalarga', 'activo', 85),
(85315, 'Sácama', 'activo', 85),
(85325, 'San Luis de Palenque', 'activo', 85),
(85400, 'Támara', 'activo', 85),
(85410, 'Tauramena', 'activo', 85),
(85430, 'Trinidad', 'activo', 85),
(85440, 'Villanueva', 'activo', 85),
(86001, 'Mocoa', 'activo', 86),
(86219, 'Colón', 'activo', 86),
(86320, 'Orito', 'activo', 86),
(86568, 'Puerto Asís', 'activo', 86),
(86569, 'Puerto Caicedo', 'activo', 86),
(86571, 'Puerto Guzmán', 'activo', 86),
(86573, 'Puerto Leguízamo', 'activo', 86),
(86749, 'Sibundoy', 'activo', 86),
(86755, 'San Francisco', 'activo', 86),
(86757, 'San Miguel', 'activo', 86),
(86760, 'Santiago', 'activo', 86),
(86865, 'Villagarzón', 'activo', 86),
(88001, 'San Andrés', 'activo', 88),
(88564, 'Providencia', 'activo', 88),
(88565, 'Santa Catalina', 'activo', 88),
(91001, 'Leticia', 'inactivo', 91),
(91002, 'Puerto Nariño', 'activo', 91),
(94001, 'Inírida', 'activo', 94),
(94343, 'Barranco Minas', 'activo', 94),
(94663, 'Mapiripana', 'activo', 94),
(94883, 'San Felipe', 'activo', 94),
(94884, 'Puerto Colombia', 'activo', 94),
(94885, 'La Guadalupe', 'activo', 94),
(94886, 'Cacahual', 'activo', 94),
(94887, 'Pana Pana', 'activo', 94),
(95001, 'San José del Guaviare', 'activo', 95),
(95015, 'Calamar', 'activo', 95),
(95025, 'El Retorno', 'activo', 95),
(95200, 'Miraflores', 'activo', 95),
(97001, 'Mitú', 'activo', 97),
(97161, 'Caruru', 'activo', 97),
(97511, 'Pacoa', 'activo', 97),
(97666, 'Taraira', 'activo', 97),
(97777, 'Papunaua', 'activo', 97),
(97889, 'Yavaraté', 'activo', 97),
(99001, 'Puerto Carreño', 'activo', 99),
(99524, 'La Primavera', 'activo', 99),
(99624, 'Santa Rosalía', 'activo', 99),
(99773, 'Cumaribo', 'activo', 99);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`pk_id_not`, `tipo_not`, `fecha_not`, `texto_not`, `fk_id_subasta`, `fk_id_usuario`) VALUES
(14, 'mensaje', '2024-06-10 04:38:28', 'Se ha creado una nueva subasta, corre a verla', 33, 2);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulantes`
--

CREATE TABLE `postulantes` (
  `pk_id_post` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `fk_id_subasta` int(11) NOT NULL,
  `estado_post` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `postulantes`
--

INSERT INTO `postulantes` (`pk_id_post`, `fk_id_usuario`, `fk_id_subasta`, `estado_post`) VALUES
(11, 4, 30, 'inactivo'),
(12, 4, 31, 'activo'),
(13, 1, 36, 'activo'),
(14, 2, 36, 'activo'),
(15, 2, 30, 'activo'),
(16, 1, 37, 'activo'),
(17, 2, 31, 'activo'),
(18, 2, 37, 'activo'),
(19, 3, 31, 'inactivo'),
(20, 1, 38, 'activo'),
(21, 1, 39, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subasta`
--

CREATE TABLE `subasta` (
  `pk_id_sub` int(11) NOT NULL,
  `fecha_inicio_sub` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_fin_sub` timestamp NOT NULL DEFAULT current_timestamp(),
  `imagen_sub` varchar(255) DEFAULT NULL,
  `precio_inicial_sub` int(11) NOT NULL,
  `precio_final_sub` int(11) DEFAULT NULL,
  `unidad_peso_sub` enum('Gramo','Libra','Kilogramo','Tonelada') NOT NULL,
  `cantidad_sub` float NOT NULL,
  `estado_sub` enum('abierta','espera','cerrada','proceso') NOT NULL,
  `certificado_sub` varchar(255) DEFAULT NULL,
  `descripcion_sub` varchar(300) NOT NULL,
  `fk_variedad` int(11) NOT NULL,
  `ganador_sub` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `subasta`
--

INSERT INTO `subasta` (`pk_id_sub`, `fecha_inicio_sub`, `fecha_fin_sub`, `imagen_sub`, `precio_inicial_sub`, `precio_final_sub`, `unidad_peso_sub`, `cantidad_sub`, `estado_sub`, `certificado_sub`, `descripcion_sub`, `fk_variedad`, `ganador_sub`) VALUES
(30, '2024-06-09 03:40:00', '2024-06-09 04:40:00', 'WhatsApp Image 2024-06-08 at 2.44.54 PM.jpeg', 99000, 199000, 'Kilogramo', 18, 'cerrada', 'requerimientos_juan.docx', 'Es una muy buena subasta', 26, 2),
(31, '2024-06-09 14:20:00', '2024-06-09 14:40:00', 'WhatsApp Image 2024-06-08 at 2.42.26 PM.jpeg', 450000, 550000, 'Tonelada', 1, 'cerrada', 'Instructivo 4-Utilizar react native Select List en el proyecto formativoyecto formativo.pdf', 'Es un café de mucha calidad', 26, 2),
(33, '2024-06-09 06:32:00', '2024-06-09 06:43:00', 'WhatsApp Image 2024-06-08 at 2.39.49 PM.jpeg', 45000, 5000000, 'Kilogramo', 63, 'cerrada', 'Instructivo 4-Utilizar react native Select List en el proyecto formativoyecto formativo.pdf', 'El mejor café que los usuarios podrían probar', 27, 2),
(36, '2024-06-09 19:18:00', '2024-06-09 19:20:00', 'WhatsApp Image 2024-06-08 at 2.42.26 PM.jpeg', 89000, 489000, 'Kilogramo', 80, 'cerrada', 'Instructivo 4-Utilizar react native Select List en el proyecto formativoyecto formativo.pdf', 'Un buen café', 27, 1),
(37, '2024-06-09 20:20:00', '2024-06-09 20:35:00', 'WhatsApp Image 2024-06-08 at 2.44.38 PM.jpeg', 56000, 216000, 'Libra', 60, 'cerrada', 'Instructivo 4-Utilizar react native Select List en el proyecto formativoyecto formativo.pdf', 'Un café unico y exclusivo', 28, 2),
(38, '2024-06-11 03:40:00', '2024-06-11 03:42:00', 'WhatsApp Image 2024-06-08 at 2.32.15 PM.jpeg', 695000, 995000, 'Tonelada', 2, 'cerrada', 'Instructivo 4-Utilizar react native Select List en el proyecto formativoyecto formativo.pdf', 'Un café único en el Huila, que ha sido cuidado con amor con toda mi familia', 27, 1),
(39, '2024-06-11 03:44:00', '2024-06-11 03:55:00', 'WhatsApp Image 2024-06-08 at 2.39.49 PM.jpeg', 45000, 105000, 'Kilogramo', 90, 'cerrada', 'Instructivo 4-Utilizar react native Select List en el proyecto formativoyecto formativo.pdf', 'El mejor café', 28, 1),
(40, '2024-06-16 17:22:00', '2024-06-16 17:40:00', 'WhatsApp Image 2024-06-08 at 2.44.38 PM.jpeg', 56000, NULL, 'Kilogramo', 80, 'espera', 'Luego vamos a ubuntu server y ejecutamos el comando nano.docx', 'Muy buen café', 26, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_variedad`
--

CREATE TABLE `tipo_variedad` (
  `pk_id_tipo_vari` int(11) NOT NULL,
  `nombre_tipo_vari` varchar(300) NOT NULL,
  `estado_tipo_vari` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_variedad`
--

INSERT INTO `tipo_variedad` (`pk_id_tipo_vari`, `nombre_tipo_vari`, `estado_tipo_vari`) VALUES
(1, 'Typica', 'activo'),
(2, 'Caturra', 'activo'),
(3, 'Morgan', 'activo'),
(4, 'Bourbon', 'activo'),
(5, 'Catuai', 'activo'),
(6, 'SL28', 'activo'),
(7, 'SL34', 'activo'),
(8, 'Gesha (o Geisha)', 'activo'),
(9, 'Pacamara', 'activo'),
(10, 'Mundo Novo', 'activo'),
(11, 'Villa Sarchí', 'activo'),
(12, 'Pacas', 'activo'),
(13, 'Maragogipe', 'activo'),
(14, 'Catimor', 'activo'),
(15, 'Kent', 'activo'),
(16, 'S795', 'activo'),
(17, 'Ruiru 11', 'activo'),
(18, 'Híbrido de Timor', 'activo'),
(19, 'Obatá', 'activo'),
(20, 'Sarchimor', 'activo'),
(21, 'Blue Mountain', 'activo'),
(22, 'Ethiopian Heirloom', 'activo'),
(23, 'Jackson', 'activo'),
(24, 'Red Bourbon', 'activo'),
(25, 'Yellow Bourbon', 'activo'),
(26, 'Pink Bourbon', 'activo'),
(27, 'French Mission', 'activo'),
(28, 'Mokka', 'activo'),
(29, 'Conilon', 'activo'),
(30, 'Nganda', 'activo'),
(31, 'Liberica estándar', 'activo'),
(32, 'Excelsa', 'activo'),
(33, 'Parainema', 'activo'),
(34, 'Tupi', 'activo'),
(35, 'Icatu', 'activo'),
(36, 'Paraiso', 'activo'),
(37, 'Batian', 'activo'),
(38, 'Oro Azteca', 'activo'),
(39, 'Catigua', 'activo'),
(40, 'T5269', 'activo'),
(41, 'Marsellesa', 'activo'),
(42, 'Prueba', 'activo'),
(43, 'Pr 2.1', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `pk_cedula_user` int(11) NOT NULL,
  `nombre_user` varchar(50) NOT NULL,
  `email_user` varchar(100) NOT NULL,
  `password_user` varchar(60) NOT NULL,
  `descripcion_user` varchar(170) DEFAULT NULL,
  `imagen_user` varchar(255) DEFAULT NULL,
  `telefono_user` varchar(12) NOT NULL,
  `rol_user` enum('vendedor','comprador','admin') NOT NULL,
  `estado_user` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`pk_cedula_user`, `nombre_user`, `email_user`, `password_user`, `descripcion_user`, `imagen_user`, `telefono_user`, `rol_user`, `estado_user`) VALUES
(1, 'vendedor', 'vendedor@gmail.com', '$2b$12$af5bnP76MuPb3IwdEsqcROiAuNt6HjOQjdhFwPtfAV0RcNAG5oJeO', '', NULL, '3167654352', 'vendedor', 'activo'),
(2, 'comprador', 'comprador@gmail.com', '$2b$12$IyNKalf9vSZLInC7u/RMPuFYSS99IcuBgYaj37eKZO7qyz3vH7KAa', '', 'imagen_perfil.jpg', '3657265342', 'comprador', 'activo'),
(3, 'comprador1', 'comprador1@gmail.com', '$2b$12$ArmUkRtymbEDYw2Gh5zybOmp7qJ.LPDWZwe96aVW4wPbN/YP1CbJm', '', NULL, '3213213213', 'comprador', 'activo'),
(4, 'vendedor1', 'vendedor1@gmail.com', '$2b$12$Ow1Y4DeNXmEgHBNT0LudDOnzwlfgKEMFWDNcMMjrmfBqiDWjZiv1u', '', NULL, '3214321321', 'vendedor', 'activo'),
(123456, 'admin', 'admin@gmail.com', '$2b$12$sfx4cyI/O.lJ1cgGyAeEy.QbRDp2ox.TbMzJU487RtZv9njcOFBAy', 'null', 'imagen_perfil5.jpg', '3214131', 'admin', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variedad`
--

CREATE TABLE `variedad` (
  `pk_id_vari` int(11) NOT NULL,
  `estado_vari` enum('activo','inactivo') NOT NULL,
  `fk_tipo_variedad` int(11) NOT NULL,
  `fk_finca` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `variedad`
--

INSERT INTO `variedad` (`pk_id_vari`, `estado_vari`, `fk_tipo_variedad`, `fk_finca`) VALUES
(26, 'activo', 1, 38),
(27, 'activo', 19, 39),
(28, 'activo', 20, 39);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veredas`
--

CREATE TABLE `veredas` (
  `pk_id_vere` bigint(20) NOT NULL,
  `nombre_vere` varchar(255) NOT NULL,
  `estado_vere` enum('activo','inactivo') NOT NULL,
  `fk_municipio` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `veredas`
--

INSERT INTO `veredas` (`pk_id_vere`, `nombre_vere`, `estado_vere`, `fk_municipio`) VALUES
(1, 'San Adolfo', 'activo', 41357),
(2, 'Remolinos', 'activo', 41357),
(3, 'Brisas del Magdalena', 'activo', 41357),
(4, 'Bellavista', 'activo', 41357),
(5, 'Campoalegre', 'activo', 41357),
(6, 'Mortiño', 'activo', 41357),
(7, 'Los Guaduales', 'activo', 41357),
(8, 'Independencia', 'activo', 41357),
(9, 'El Tigre', 'activo', 41357),
(10, 'Belén', 'activo', 41357),
(11, 'La Marqueza', 'activo', 41357),
(12, 'Primavera', 'activo', 41357),
(13, 'Las Guacas', 'activo', 41357),
(14, 'Granada', 'activo', 41357),
(15, 'Bajo Magdalena', 'activo', 41357),
(16, 'Bajo Modeyal', 'activo', 41357),
(17, 'Alto Modeyal', 'activo', 41357),
(18, 'San Lorenzo', 'activo', 41357),
(19, 'El Trebol', 'activo', 41357),
(20, 'Cañaveral', 'activo', 41357),
(21, 'Ídolos', 'activo', 41357),
(22, 'Betania', 'activo', 41357),
(23, 'Rodrigo Lara', 'activo', 41357),
(24, 'Canastos', 'activo', 41357),
(25, 'Vega de Isnos', 'activo', 41357),
(26, 'Cambulos', 'activo', 41357),
(27, 'Villa Nueva', 'activo', 41357),
(28, 'La Victoria', 'activo', 41357),
(29, 'Ciénaga Grande', 'activo', 41357),
(30, 'Cienaga Chiquita', 'activo', 41357),
(31, 'La Florida', 'activo', 41357),
(32, 'Plomadas', 'activo', 41357),
(33, 'Capillas', 'activo', 41357),
(34, 'Porvenir', 'activo', 41357),
(35, 'Salen', 'activo', 41357),
(36, 'Bajo Junin', 'activo', 41357),
(37, 'Diamante', 'activo', 41357),
(38, 'Alto Junin', 'activo', 41357),
(39, 'Silvania', 'activo', 41357),
(40, 'Delicias', 'activo', 41357),
(41, 'Alto Brisas', 'activo', 41357),
(42, 'Bajo Brisas', 'activo', 41357),
(43, 'La Muralla', 'activo', 41357),
(44, 'Bajo Planes', 'activo', 41357),
(45, 'El Jardín', 'activo', 41357),
(46, 'Alto Planes', 'activo', 41357),
(47, 'Salto de Bordones', 'activo', 41357),
(48, 'Buenos Aires', 'activo', 41357),
(49, 'Sinai', 'activo', 41357),
(50, 'Jerusalen', 'activo', 41357),
(51, 'El Progreso', 'activo', 41357),
(52, 'Yarumal', 'activo', 41357),
(53, 'San Vicente', 'activo', 41357),
(54, 'Hornitos', 'activo', 41357),
(55, 'Palmeiras', 'activo', 41357),
(56, 'Rivera', 'activo', 41357),
(57, 'Las Jarras', 'activo', 41357),
(58, 'Agrado', 'activo', 41357),
(59, 'Paloquemao', 'activo', 41357),
(60, 'Marmol', 'activo', 41357),
(61, 'Villa del Prado', 'activo', 41357),
(65, 'Deliciasss', 'activo', 41001),
(66, 'El Oso', 'activo', 41668),
(67, 'La Argentina', 'activo', 41668),
(68, 'El Palmar', 'activo', 41668),
(69, 'El Salto', 'activo', 41668),
(70, 'El Tablón', 'activo', 41668),
(71, 'El Vergel', 'activo', 41668),
(72, 'El Zapote', 'activo', 41668),
(73, 'La Cabaña', 'activo', 41668),
(74, 'La Candelaria', 'activo', 41668),
(75, 'La Ceiba', 'activo', 41668),
(76, 'La Chorrera', 'activo', 41668),
(77, 'La Cristalina', 'activo', 41668),
(78, 'La Esperanza', 'activo', 41668),
(79, 'La Florida', 'activo', 41668),
(80, 'La Guaira', 'activo', 41668),
(81, 'La Hacienda', 'activo', 41668),
(82, 'La Laguna', 'activo', 41668),
(83, 'La Loma', 'activo', 41668),
(84, 'La Palma', 'activo', 41668),
(85, 'Guandinosa', 'activo', 41551),
(86, 'Normandía', 'activo', 41551),
(87, 'Palmar de Criollo', 'activo', 41551),
(88, 'La Castilla', 'activo', 41551),
(89, 'El Líbano', 'activo', 41551),
(90, 'Albania', 'activo', 41551),
(91, 'La Parcela', 'activo', 41551),
(92, 'Palmeras', 'activo', 41551),
(93, 'El Jardín', 'activo', 41551),
(94, 'Filo Seco', 'activo', 41551),
(95, 'Líbano', 'activo', 41551),
(96, 'Bajo Solarte', 'activo', 41551),
(97, 'Tabacal', 'activo', 41551),
(98, 'Betania', 'activo', 41551),
(99, 'Lucitania', 'activo', 41551),
(100, 'Bruselas', 'activo', 41551),
(101, 'El Pital', 'activo', 41551),
(102, 'Aguablanca', 'activo', 41551),
(103, 'San Antonio', 'activo', 41551),
(104, 'La Laguna', 'activo', 41551),
(105, 'Prueba Vereda', 'activo', 1),
(106, 'Prueba Vereda 1', 'activo', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`pk_id_cali`),
  ADD KEY `calificar` (`fk_usuario`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD UNIQUE KEY `tener` (`pk_codigo_depar`) USING BTREE;

--
-- Indices de la tabla `finca`
--
ALTER TABLE `finca`
  ADD PRIMARY KEY (`pk_id_fin`),
  ADD KEY `fincaUser` (`fk_id_usuario`),
  ADD KEY `poseer` (`fk_vereda`) USING BTREE;

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
  ADD PRIMARY KEY (`pk_id_ofer`),
  ADD KEY `PostulaUser` (`fk_id_usuario`),
  ADD KEY `Postulasub` (`fk_id_subasta`);

--
-- Indices de la tabla `postulantes`
--
ALTER TABLE `postulantes`
  ADD PRIMARY KEY (`pk_id_post`),
  ADD UNIQUE KEY `quedar` (`pk_id_post`) USING BTREE,
  ADD UNIQUE KEY `tener` (`pk_id_post`) USING BTREE,
  ADD KEY `fk_id_subasta` (`fk_id_subasta`) USING BTREE,
  ADD KEY `fk_id_usuario` (`fk_id_usuario`) USING BTREE;

--
-- Indices de la tabla `subasta`
--
ALTER TABLE `subasta`
  ADD PRIMARY KEY (`pk_id_sub`),
  ADD KEY `variedad` (`fk_variedad`) USING BTREE;

--
-- Indices de la tabla `tipo_variedad`
--
ALTER TABLE `tipo_variedad`
  ADD PRIMARY KEY (`pk_id_tipo_vari`);

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
  ADD KEY `tipo_variedad` (`fk_tipo_variedad`),
  ADD KEY `finca` (`fk_finca`) USING BTREE;

--
-- Indices de la tabla `veredas`
--
ALTER TABLE `veredas`
  ADD PRIMARY KEY (`pk_id_vere`),
  ADD KEY `localizar` (`fk_municipio`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `pk_id_cali` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `finca`
--
ALTER TABLE `finca`
  MODIFY `pk_id_fin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `pk_id_not` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `pk_id_ofer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `postulantes`
--
ALTER TABLE `postulantes`
  MODIFY `pk_id_post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `subasta`
--
ALTER TABLE `subasta`
  MODIFY `pk_id_sub` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `tipo_variedad`
--
ALTER TABLE `tipo_variedad`
  MODIFY `pk_id_tipo_vari` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `variedad`
--
ALTER TABLE `variedad`
  MODIFY `pk_id_vari` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `veredas`
--
ALTER TABLE `veredas`
  MODIFY `pk_id_vere` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`pk_cedula_user`);

--
-- Filtros para la tabla `finca`
--
ALTER TABLE `finca`
  ADD CONSTRAINT `fincaUser` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`pk_cedula_user`),
  ADD CONSTRAINT `finca_ibfk_1` FOREIGN KEY (`fk_vereda`) REFERENCES `veredas` (`pk_id_vere`);

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
  ADD CONSTRAINT `variedad_ibfk_1` FOREIGN KEY (`fk_finca`) REFERENCES `finca` (`pk_id_fin`),
  ADD CONSTRAINT `variedad_ibfk_2` FOREIGN KEY (`fk_tipo_variedad`) REFERENCES `tipo_variedad` (`pk_id_tipo_vari`);

--
-- Filtros para la tabla `veredas`
--
ALTER TABLE `veredas`
  ADD CONSTRAINT `veredas_ibfk_1` FOREIGN KEY (`fk_municipio`) REFERENCES `municipio` (`pk_codigo_muni`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
