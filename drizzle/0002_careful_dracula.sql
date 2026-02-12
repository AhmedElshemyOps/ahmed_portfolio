CREATE TABLE `contact_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visitorName` varchar(255) NOT NULL,
	`visitorEmail` varchar(320) NOT NULL,
	`visitorPhone` varchar(20),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`isRead` int NOT NULL DEFAULT 0,
	`emailSent` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);
