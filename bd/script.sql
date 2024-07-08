-- // se debe ejecutar el script completo //--  

SET FOREIGN_KEY_CHECKS = 0;
drop table if exists users;
drop table if exists roles;
drop table if exists states;
drop table if exists users_company;
drop table if exists companies;
drop table if exists menu;
drop table if exists children_menu;
drop table if exists grand_son_menu;
drop table if exists menu_rol;

SET FOREIGN_KEY_CHECKS = 1;


-- CREATE TABLA STATE --

CREATE TABLE `states` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- CREATE TABLA ROLES --

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- CREATE TABLA USERS --

-- agrisoft.users definition

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `password` varchar(300) NOT NULL,
  `id_state` int(11) NOT NULL,
  `id_company` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_roles_fk` (`id_rol`),
  KEY `users_states_fk` (`id_state`),
  CONSTRAINT `users_roles_FK` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`),
  CONSTRAINT `users_states_FK` FOREIGN KEY (`id_state`) REFERENCES `states` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- CREATE TABLA COMPANIES --

CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_company` varchar(255) NOT NULL,
  `rut` varchar(20) NOT NULL,
  `giro` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `web` varchar(255) NOT NULL,
  `compensation_box` varchar(255) NOT NULL,
  `legal_representative_name` varchar(255) NOT NULL,
  `legal_representative_rut` varchar(20) NOT NULL,
  `legal_representative_phone` varchar(20) NOT NULL,
  `legal_representative_email` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- INSERT  STATE --

INSERT INTO agrisoft.states
(descripcion)
VALUES('ACTIVO');
INSERT INTO agrisoft.states
(descripcion)
VALUES('INACTIVO');

-- INSERT  ROLES --

INSERT INTO agrisoft.roles
(descripcion)
VALUES('Superadmin');
INSERT INTO agrisoft.roles
(descripcion)
VALUES('Admin');
INSERT INTO agrisoft.roles
(descripcion)
VALUES('User');
INSERT INTO agrisoft.roles
(descripcion)
VALUES('Cosecheros');


-- INSERT  COMPANY --

INSERT INTO agrisoft.companies
(name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status)
VALUES('Agrisosft', '18.128.602-4', 'Desarrollo de software', 'XVI', 'Chillán', 'Av. Norte #555', '987654321', 'https://www.agrisoft.cl', '1', 'Javier Donoso', '17.485.937-K', '123456789', 'javier.donoso@gmail.com', 1);

INSERT INTO agrisoft.companies
(name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status)
VALUES('Empresa Admin', '1-9', 'giro de prueba', 'X', 'Puerto Montt', 'direccion de prueba', '12345678', 'https://stackoverflow.com/', '1', 'javier donoso', '1-9', '12345678', 'prueba@prueba.cl', 1);


-- INSERT  USERS --

INSERT INTO agrisoft.users
(name, lastname, mail, id_rol, password, id_state, id_company)
VALUES('Matias', 'Paillalef', 'm.paillalef.c@gmail.com', 1, '$2a$12$g/81By6B6mSMpPsVo/Pameann1cD0om6TfAJTqaVaHsLrJryRlM.W', 1, 1);
INSERT INTO agrisoft.users
(name, lastname, mail, id_rol, password, id_state, id_company)
VALUES('javier', 'Donoso', 'donoso.javier@gmail.com', 1, '$2b$10$pRqfFjs3n5u3i1Po.Fg4QOsxrJRCUf8uf20YucSrBGZCBB4z/CKuS', 1, 1);
INSERT INTO agrisoft.users
(name, lastname, mail, id_rol, password, id_state, id_company)
VALUES('usuario', 'admin', 'user@user.cl', 1, '$2b$10$X1Qd2iV2ohVwsIoIcCVrye1D87JZUqWzSWNMj7WidaZBCAbRXxpMi', 1, 2);

-- //////////// MENU //////////////


-- CREATE TABLA MENU --

CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(100) DEFAULT NULL,
  `icon` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Inicio', '/dashboard', 'HomeModernIcon');
INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Configuración', '/dashboard/enviroment', 'Cog8ToothIcon');
INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Producción', '/dashboard/production', 'TableCellsIcon');
INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Gestión de personas', '/dashboard/people-management', 'UserGroupIcon');
INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Reportes', '/dashboard/reports', 'DocumentChartBarIcon');

-- CREATE TABLA CHILDREN_MENU --

CREATE TABLE `children_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_menu` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `children_menu_menu_FK` (`id_menu`),
  CONSTRAINT `children_menu_menu_FK` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(2, 'Empresa', '/dashboard/enviroment/company');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(2, 'Creación de roles', '/dashboard/enviroment/role-creation');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(2, 'Creación de usuarios', '/dashboard/enviroment/user-creation');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Campo', '/dashboard/production/ground''');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Sectors / Cuarteles', '/dashboard/production/sectors-barracks');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Atributos de sector', '/dashboard/production/sector attributes');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Especies', '/dashboard/production/species');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Variedades', '/dashboard/production/varieties');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Ciclos', '/dashboard/production/cycles');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Lotes', '/dashboard/production/lots');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Plantaciones', '/dashboard/production/plantations');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Cosechas', '/dashboard/production/harvests');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Inventario', '/dashboard/production/inventory');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(4, 'Parametrización de personal', '#');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(4, 'Carga de asistencia', '/dashboard/people-management/attendance');


-- CREATE TABLA GRAND_SON_MENU --


CREATE TABLE `grand_son_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_children_menu` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_children_menu` (`id_children_menu`),
  CONSTRAINT `grand_son_menu_ibfk_1` FOREIGN KEY (`id_children_menu`) REFERENCES `children_menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Contratistas', '/dashboard/people-management/contractors');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Cargos', '/dashboard/people-management/positions');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Grupos', '/dashboard/people-management/groups');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Cuadrillas', '/dashboard/people-management/squads');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Turnos', '/dashboard/people-management/shifts');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Trabajadores', '/dashboard/people-management/workers');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Mensajes', '/dashboard/people-management/messages');


-- agrisoft.menu_rol definition

CREATE TABLE `menu_rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_menu` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_rol_menu_FK` (`id_rol`),
  KEY `menu_rol_menu_FK_1` (`id_menu`),
  CONSTRAINT `menu_rol_menu_FK` FOREIGN KEY (`id_rol`) REFERENCES `menu` (`id`),
  CONSTRAINT `menu_rol_menu_FK_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(1, 1);
INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(2, 1);
INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(3, 1);
INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(4, 1);
INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(5, 1);

