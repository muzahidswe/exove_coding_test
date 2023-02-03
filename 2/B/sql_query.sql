-- mysql> select * from people;
-- +----+------------+-------------+
-- | id | first_name | last_name   |
-- +----+------------+-------------+
-- |  1 | John       | Smith       |
-- |  2 | Mary       | Jones       |
-- |  3 | Gerhard    | Feuerhaufen |
-- |  4 | Rami       | Pitkäniemi  |
-- |  5 | Anna       | Kråkström   |
-- +----+------------+-------------+

-- mysql> select * from phones;
-- +----+---------+------------------+
-- | id | user_id | number           |
-- +----+---------+------------------+
-- |  1 |       2 | +1 213 621 0002  |
-- |  2 |       2 | +1 800 444 4444  |
-- |  3 |       1 | +1 604 444 4444  |
-- |  4 |       1 | +44 20 8759 9036 |
-- |  5 |       4 | +358 50 333 3333 |
-- |  6 |       5 | +46 771 793 336  |
-- +----+---------+------------------+

-- Create a single SQL query that will produce the following:

-- +---------------------+----------------------------------+
-- | name                | numbers                          |
-- +---------------------+----------------------------------+
-- | Gerhard Feuerhaufen | N/A                              |
-- | Mary Jones          | +1 213 621 0002,+1 800 444 4444  |
-- | Anna Kråkström      | +46 771 793 336                  |
-- | Rami Pitkäniemi     | +358 50 333 3333                 |
-- | John Smith          | +1 604 444 4444,+44 20 8759 9036 |
-- +---------------------+----------------------------------+

SELECT
	CONCAT(people.first_name, ' ', people.last_name) AS `name`,
	IF(GROUP_CONCAT(DISTINCT phones.number SEPARATOR ', ') IS NULL, 'N/A', GROUP_CONCAT(DISTINCT phones.number SEPARATOR ', ')) AS `numbers`
FROM
  people
  LEFT JOIN phones ON people.id = phones.user_id
GROUP BY
  people.id
ORDER BY
  people.last_name, people.first_name;