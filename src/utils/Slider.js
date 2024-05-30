import React from "react";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const styles = { height: 400, width: "100%" };
const icon_glass = <span className="fa fa-glass" />;
const icon_music = <span className="fa fa-music" />;
const Row = React.memo(function Row(props) {
  return <div className="row">{props.children}</div>;
});

const Col = React.memo(function Col(props) {
  return (
    <div className={`col-sm-${props.span}`} style={props.style}>
      {props.children}
    </div>
  );
});
class DemoV4 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: true
    };
  }
  onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  visiableOnSelect = active => {
    console.log(`visiable onSelect active=${active}`);
  };
  slideNext = () => {
    this.slider.slideNext();
  };
  slidePrev = () => {
    this.slider.slidePrev();
  };
  goToSlide = () => {
    this.slider.goToSlide(1);
  };
  autoplay = () => {
    this.setState({ autoplay: !this.state.autoplay });
  };
  _changeIcon = () => {
    let { leftIcon, rightIcon } = this.state;
    leftIcon = leftIcon ? undefined : icon_glass;
    rightIcon = rightIcon ? undefined : icon_music;
    this.setState({ leftIcon, rightIcon });
  };
  render() {
    return (
      <div className="container-fluid" style={{ paddingBottom: 20 }}>
        <Row>

          <Col span={12} style={{ marginTop: 20 }}>
            <RBCarousel
              animation={true}
              autoplay={this.state.autoplay}
              slideshowSpeed={2000}
              defaultActiveIndex={0}
              leftIcon={this.state.leftIcon}
              rightIcon={this.state.rightIcon}
              onSelect={this._onSelect}
              ref={r => (this.slider = r)}
              version={4}
            >
              <div style={{ height: 400 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.w3schools.com/bootstrap/ny.jpg"
                />
                <div className="carousel-caption">Image</div>
              </div>
              <div style={{ height: 400 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.w3schools.com/bootstrap/ny.jpg"
                />
                <div className="carousel-caption">Image</div>
              </div>
              <div style={{ height: 400 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.w3schools.com/bootstrap/ny.jpg"
                />
                <div className="carousel-caption">Image</div>
              </div>
              {/* <div style={{ ...styles, backgroundColor: "aqua" }}>
                <video
                  className="carousel-center"
                  controls
                  style={{ width: "75%" }}
                  height="250"
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="carousel-caption">Video</div>
              </div> */}
              <div style={{ ...styles, backgroundColor: "lightpink" }}>
                <div className="carousel-center">center Text</div>
                <div className="carousel-caption">Text</div>
              </div>
              <div style={{ ...styles, backgroundColor: "lightblue" }}>
                <span>text</span>
                <div className="carousel-caption">Text</div>
              </div>
              {/* <div style={{ ...styles, backgroundColor: "lightblue" }}>
                <div className="carousel-center">
                  <iframe
                    style={{ width: 500 }}
                    height="250"
                    src="https://www.youtube.com/embed/MhkGQAoc7bc?showinfo=0"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
                <div className="carousel-caption">Youtube</div>
              </div> */}
            </RBCarousel>
          </Col>

        </Row>
      </div>
    );
  }
}

export default DemoV4