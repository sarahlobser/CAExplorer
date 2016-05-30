# Cellular Automaton Explorer
### Week 13 side project at Skill Distillery
### About the cellular automaton
The cellular automaton explored in this project is a grid where the state of each cell (0 or 1) is dependant on the state of its neighbors. The state of each cell will change, or not, at a fixed time interval. Each cell has 8 neighbors, and the neighbor states are represented by an 8-bit binary string (0 to 255 in decimal). A ruleset is a set of numbers between 0 and 255 that instruct each cell to change its state. That is, if a cell's neighborhood matches one of the ruleset numbers, its state will change on the next iteration.
### The web app
This is an Express/Node.js project with a MySQL database to house users' favorite rulesets. Requests to the server are synchronous at the moment. In the next iteration of the project asynchronous requests will be made so that the animation won't be interrupted as the user changes or saves the current ruleset.
