USE setu;
DROP TRIGGER IF EXISTS count_score;
DELIMITER $$
CREATE TRIGGER count_score AFTER INSERT ON scores FOR EACH ROW
BEGIN
	DECLARE newScore INT;
	SELECT ROUND(AVG(score)) INTO newScore FROM scores WHERE scores.picture_id = NEW.picture_id; 
	UPDATE pictures SET total_score = newScore WHERE pictures.picture_id = NEW.picture_id;
END$$
DELIMITER ;

USE setu;
DROP TRIGGER IF EXISTS delete_picture;
DELIMITER $$
CREATE TRIGGER delete_picture AFTER DELETE ON pictures FOR EACH ROW
BEGIN
	DELETE FROM scores WHERE picture_id = OLD.picture_id; 
	DELETE FROM tags WHERE picture_id = OLD.picture_id; 
END$$
DELIMITER ;