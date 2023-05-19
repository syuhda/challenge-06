import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../redux/actions/postActions";

function PopularMovie() {
  // To set the state of the store => buat ngeset
  const dispatch = useDispatch();

  // Access the store => buat ngakses
  const { popularMovies } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col sm={10}>
            <h3 className="text-danger text-popular">
              <b>Popular Movies</b>
            </h3>
          </Col>
          <Col sm={2} className="text-right">
            <Button
              variant="outline-danger"
              className=" all-movie mt-1 rounded"
              style={{ borderRadius: "20px" }}
              as={Link}
              to={`/all-movies`}
            >
              See All Movie <i className="fas fa-arrow-right" />
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          {popularMovies.map((movie) => (
            <Col sm={12} md={6} lg={3} key={movie.id}>
              <Link
                to={`/details/${movie.id}`}
                style={{ textDecoration: "none", borderColor: "#d9534f" }}
              >
                <Card
                  className="card"
                  style={{ marginBottom: "50px", borderRadius: "10px" }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />

                  <Card.Body
                    className="card-content"
                    style={{ height: "90px" }}
                  >
                    <Card.Title className="card-title text-center text-white ">
                      <b>{movie.title}</b>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default PopularMovie;
