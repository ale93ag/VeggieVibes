import styled from "styled-components";

const Card = styled.div`
  min-height: 18rem;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  img {
    border-radius: 1.5rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    color: white;
    background: rgba(0, 0, 0, 0.7);
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    width: auto;
    text-align: center;
    font-weight: 500;
    font-size: 0.8rem;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease, transform 0.3s ease, font-size 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.9);
      font-size: 0.9rem;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    min-height: 15rem;

    p {
      font-size: 0.7rem;

      &:hover {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 480px) {
    min-height: 12rem;

    p {
      font-size: 0.6rem;

      &:hover {
        font-size: 0.8rem;
      }
    }
  }
`;

export default Card