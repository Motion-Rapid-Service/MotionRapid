
const timeLineMousePosition = (
    event: any,
    //   timelineAreaElement: any,
    AreaElement: any
    //   timelineScrollElement: any
  ) => {
    const clientX = event.clientX;
    const clientY = event.clientY;
  
    const ElementBoundingClientRect =
      AreaElement.current.getBoundingClientRect();
  
    const ElementLeft = ElementBoundingClientRect.left;
    const ElementTop = ElementBoundingClientRect.top;
  
    //   const timelineAreaElementBoundingClientRect =
    //     timelineAreaElement.current.getBoundingClientRect();
  
    //   const areaElementLeft = timelineAreaElementBoundingClientRect.left;
    //   const areaElementTop = timelineAreaElementBoundingClientRect.top;
  
    //   const timelineScrollElementBoundingClientRect =
    //     timelineScrollElement.current.getBoundingClientRect();
  
    //   const scrollElementLeft = timelineScrollElementBoundingClientRect.left;
    //   const scrollElementTop = timelineScrollElementBoundingClientRect.top;
  
    const mouseAreaX = clientX - ElementLeft - 300;
    const mouseAreaY = clientY - ElementTop;
    //   console.log(mouseAreaX, mouseAreaY);
  
    return [mouseAreaX, mouseAreaY];
  };
  export default timeLineMousePosition;
