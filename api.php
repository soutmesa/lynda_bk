<?php
$db_host="localhost";
$db_name="zadmin_lynda";
$db_user="lynda";
$db_pass="aty2yge8u";
$db_connect = new PDO('mysql:host='. $db_host .';dbname='. $db_name .';charset=utf8', $db_user, $db_pass);
$db_connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db_connect->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db_connect->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES 'utf8'");
$limit = isset($_GET['limit'])? $_GET['limit'] : 0 ;
$offset = isset($_GET['offset'])? $_GET['offset'] : 0;
switch ($_REQUEST['act']) {
	case 'get_courses':
		try {
			$query = "SELECT * FROM courses";
			$stmt = $db_connect->prepare($query);
			$stmt->execute();
			// return all datas queried object
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($results);
			// echo "string";
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	case 'get_course':
		try {
			$id = $_GET['id'];
			$query = "SELECT videos.id as v_id, videos.name as v_name, subtitle, v_code, courses.name, categories.cate_name FROM videos ";
			$query .= "INNER JOIN courses ON courses.id = videos.course_id ";
			$query .= "INNER JOIN cate_course ON courses.id = cate_course.course_id ";
			$query .= "INNER JOIN categories ON cate_course.cate_id = categories.id ";
			$query .= "WHERE courses.id = '" .$id. "' ORDER BY v_code";
			$stmt = $db_connect->prepare($query);
			$stmt->execute();
			// return all datas queried object
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($results);
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	case 'get_categories':
		try {
			$stmt = $db_connect->prepare("SELECT * FROM categories");
			$stmt->execute();
			// return all datas queried object
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($results);
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	case 'search':
		try {
			$query = "SELECT * FROM courses INNER JOIN cate_course ON ";
			$query .= "courses.id = cate_course.course_id INNER JOIN categories ";
			$query .= "ON cate_course.cate_id = categories.id WHERE ";
			$query .= "CONCAT_WS(courses.name, author, level, description, tag, categories.cate_name) LIKE '%";
			if (!empty($_GET['key'])){
				$query .= $_GET['key'];
			}
			$query .= "%' ";
			if (!empty($_GET['id'])){
				$query .= "OR categories.id = '" . $_GET['id'] . "' ";
			}
			$query .= "ORDER BY name DESC ";
			$stmt = $db_connect->prepare($query);
			$stmt->execute();
			// return all datas queried object
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
			// echo $query;
			echo json_encode($results);
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	case 'search_length':
		try {
			$query = "SELECT count(*) as leng FROM courses INNER JOIN cate_course ON ";
			$query .= "courses.id = cate_course.course_id INNER JOIN categories ";
			$query .= "ON cate_course.cate_id = categories.id WHERE ";
			$query .= "CONCAT_WS(courses.name, author, level, description, tag, categories.cate_name) LIKE '%";
			if (!empty($_GET['key'])){
				$query .= $_GET['key'];
			}
			$query .= "%' ";
			if (!empty($_GET['id'])){
				$query .= "OR categories.id = '" . $_GET['id'] . "' ";
			}
			$stmt = $db_connect->prepare($query);
			$stmt->execute();
			// return all datas queried object
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
			// echo $query;
			echo json_encode($results);
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	default:
		# code...
		break;
}
