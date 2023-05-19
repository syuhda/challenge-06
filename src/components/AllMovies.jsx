import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/actions/postActions";

function AllMovies() {
  // To set the state of the store => buat ngeset
  const dispatch = useDispatch();

  // Access the store => buat ngakses
  const { movies } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <div className="bg">
      <Container style={{ paddingTop: "6rem" }}>
        <Row>
          {movies.length > 0 &&
            movies.map((movie) => (
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
                      {/* <p className="card-text">{movie.release_date}</p>
                  <p className="card-text">{movie.overview}</p> */}
                      {/* <Button variant="danger" className="ms-2" style={{ borderRadius: "20px", width: "120px" }}>
                    See Details
                  </Button> */}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default AllMovies;
