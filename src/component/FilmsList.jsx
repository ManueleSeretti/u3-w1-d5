import { Component } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";

class FilmsList extends Component {
  state = {
    films: [],
    respons: false,
  };
  componentDidMount = async () => {
    try {
      const resp = await fetch(this.props.url);
      const objFilms = await resp.json();
      const FilmsArrey = objFilms.Search;
      const sliceFilms = FilmsArrey.slice(0, 6);
      this.setState({ films: sliceFilms, respons: true });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container fluid>
        <Row className="bg-black g-2 gy-2">
          <h4 className="text-start text-light mt-4">{this.props.title}</h4>
          {!this.state.respons && <Spinner variant="success" animation="border" role="status"></Spinner>}
          {this.state.films.map((film, index) => (
            <Col key={index} className="col-xs-6 col-md-4 col-lg-2 card-film">
              <Card className="bg-black">
                <Card.Img style={{ height: "250px", objectFit: "contain" }} variant="fluid" src={film.Poster} />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
export default FilmsList;
