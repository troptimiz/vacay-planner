# vacay-planner

Vacay Planner is travel based product which aims to provide customers in providing engaging travel & entertainment experience seamless manner.We will be updating our repositories as development progress

Technology Stack
=================

Since the below proven technologies are well-known in their arena we feel that no description is required to justify their usage in our stack

NodeJS,BackboneJS,MongoDB,MySQL,Bootstrap - CSS framework 


REST API 
========

ALL Categories
=================

GET - http://vacay-planner.com/categories/

Category DETAIL
===============

GET - http://vacay-planner.com/categories/{categoryId}
	
Example -- http://vacay-planner.com/categories/cat10003


Resorts SEARCH
===============


POST - http://vacay-planner.com/resort/search/
	-- with Search_Request.json
POST -- (Pagination) http://vacay-planner.com/resort/search

Resort DETAIL
==============

GET - http://vacay-planner.com/resort/{resort_id}

Example - http://vacay-planner.com/resort/100001


Resort DELETE
==============

DELETE - http://vacay-planner.com/resort/{resort_id}

Example - http://vacay-planner.com/resort/100001


Resort UPDATE
==============

POST - http://vacay-planner.com/resort/{resort_id}

Example - http://vacay-planner.com/resort/100001
