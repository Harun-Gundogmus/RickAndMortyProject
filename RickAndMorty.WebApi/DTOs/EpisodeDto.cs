using RickAndMorty.WebApi.Models;

namespace RickAndMorty.WebApi.DTOs;

public sealed record EpisodeDto(
    InfoDto Info,
    List<ResultDto> Results
    );


